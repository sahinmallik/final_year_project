import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Stack,
  InputLabel,
  Link,
} from "@mui/material";
import TextField from "@mui/material/TextField";
// import AdminNavbar from "./UserNavbar/AdminNavbar";
import StartEnd from "./StartEnd";
import ElectionStatus from "./ElectionStatus";
import UserHome from "./UserHome";
import { useForm } from "react-hook-form";
import Election from "../contracts/Election.json";
import getWeb3 from "../getWeb3";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import UserNavbar from "./UserNavbar/UserNavbar";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [web3, setWeb3] = useState(null);
  const [ElectionInstance, setElectionInstance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [elStarted, setElStarted] = useState(false);
  const [elEnded, setElEnded] = useState(false);
  const [elDetails, setElDetails] = useState({});

  useEffect(() => {
    const init = async () => {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const instance = new web3.eth.Contract(
          Election.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setElectionInstance(instance);
        setAccount(accounts[0]);

        const admin = await instance.methods.getAdmin().call();
        if (accounts[0] === admin) {
          setIsAdmin(true);
        }

        const start = await instance.methods.getStart().call();
        setElStarted(start);
        const end = await instance.methods.getEnd().call();
        setElEnded(end);

        const adminName = await instance.methods.getAdminName().call();
        const adminEmail = await instance.methods.getAdminEmail().call();
        const adminTitle = await instance.methods.getAdminTitle().call();
        const electionTitle = await instance.methods.getElectionTitle().call();
        const organizationTitle = await instance.methods
          .getOrganizationTitle()
          .call();

        setElDetails({
          adminName,
          adminEmail,
          adminTitle,
          electionTitle,
          organizationTitle,
        });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  const endElection = async () => {
    await ElectionInstance.methods
      .endElection()
      .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
    window.location.reload();
  };

  const registerElection = async (data) => {
    try {
      await ElectionInstance.methods
        .setElectionDetails(
          data.adminName.toLowerCase(),
          data.adminEmail.toLowerCase(),
          data.adminTitle.toLowerCase(),
          data.electionTitle.toLowerCase(),
          data.organizationTitle.toLowerCase()
        )
        .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!web3) {
    return (
      <>
        {isAdmin ? <AdminNavbar /> : <UserNavbar />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(isMobile ? 2 : 3),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing(isMobile ? 2 : 3),
              marginTop: "2rem",
              backgroundColor: "#ddffff",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            Loading Web3, accounts, and contract..
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#00a5ff" }}>
      {isAdmin ? <AdminNavbar /> : <UserNavbar />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing(isMobile ? 2 : 3),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(isMobile ? 2 : 3),
            marginTop: "2rem",
            backgroundColor: "#ddffff",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
            borderRadius: "10px",
          }}
        >
          Your Account: {account}
        </Box>
        {!elStarted & !elEnded ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing(isMobile ? 2 : 3),
              marginTop: "2rem",
              backgroundColor: "#ddffff",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"} component="h3">
              The election has not been initialized.
            </Typography>
            {isAdmin ? (
              <Typography variant={isMobile ? "h6" : "h6"} component="h5">
                Set up the election.
              </Typography>
            ) : (
              <Typography variant={isMobile ? "h6" : "h6"} component="h5">
                Please wait...
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
      {isAdmin ? (
        <AdminHome
          elStarted={elStarted}
          elEnded={elEnded}
          registerElection={registerElection}
          endElection={endElection}
          elDetails={elDetails}
        />
      ) : elStarted ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <UserHome el={elDetails} />
        </Stack>
      ) : !elStarted && elEnded ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing(isMobile ? 2 : 3),
              marginTop: "2rem",
              backgroundColor: "#ddffff",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"} component="h3">
              The Election ended.
            </Typography>
            <Link href="/result" color="inherit">
              {"Result"}
            </Link>{" "}
          </Box>
        </Stack>
      ) : null}
    </Box>
  );
}

function AdminHome({
  elStarted,
  elEnded,
  registerElection,
  endElection,
  elDetails,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    registerElection(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {!elStarted & !elEnded ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: theme.spacing(isMobile ? 2 : 3),
              marginLeft: isMobile ? "0%" : isTablet ? "14%" : "22%",
              marginTop: "2rem",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ fontSize: "1.85rem" }}
            >
              About Admin
            </Typography>
          </Box>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: isMobile ? theme.spacing(2) : "2rem",
                backgroundColor: "#f2f2f2",
                borderRadius: "20px",
                width: isMobile ? "95%" : isTablet ? "65%" : "53%",
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "35ch" },
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    Name:
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required
                    name="name"
                    type="text"
                    {...register("adminName", { required: true })}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "35ch" },
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    Email:
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    required
                    name="email"
                    type="email"
                    {...register("adminEmail", {
                      required: "*Required",
                    })}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "35ch" },
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    Job Title:
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label="job title"
                    variant="outlined"
                    required
                    name="jobTitle"
                    type="text"
                    {...register("adminTitle", { required: true })}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: theme.spacing(isMobile ? 2 : 3),
              marginLeft: isMobile ? "0%" : isTablet ? "14%" : "22%",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ fontSize: "1.85rem" }}
            >
              About Election
            </Typography>
          </Box>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: isMobile ? theme.spacing(2) : "2rem",
                backgroundColor: "#f2f2f2",
                borderRadius: "20px",
                width: isMobile ? "95%" : isTablet ? "65%" : "53%",
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "35ch" },
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    Election Title:
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    required
                    sx={{ width: "25ch" }}
                    name="title"
                    type="text"
                    {...register("electionTitle", { required: true })}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "35ch" },
                  }}
                >
                  <InputLabel
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    Organization Name:
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label="Org. Name"
                    variant="outlined"
                    required
                    name="organization"
                    type="text"
                    {...register("organizationTitle", { required: true })}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </>
      ) : elStarted ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <UserHome el={elDetails} />
        </Stack>
      ) : null}

      <Stack direction="column" justifyContent="center" alignItems="center">
        <StartEnd
          elStarted={elStarted}
          elEnded={elEnded}
          endElFn={endElection}
        />
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ElectionStatus elStarted={elStarted} elEnded={elEnded} />
      </Stack>
    </Box>
  );
}
