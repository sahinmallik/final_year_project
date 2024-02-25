import React, { useState, useEffect } from "react";

import {
  Box,
  useTheme,
  useMediaQuery,
  InputLabel,
  TextField,
  Typography,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Modal,
} from "@mui/material";
// import AdminNavbar from "../UserNavbar/AdminNavbar";
import NotInit from "../../NotInit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Camera from "./Camera";
import UserNavbar from "../UserNavbar/UserNavbar";
// import AdminNavbar from "../UserNavbar/AdminNavbar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import getWeb3 from "../../getWeb3";
import axios from "axios";
import Election from "../../contracts/Election.json";
export default function Registration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [elStarted, setElStarted] = useState(false);
  const [elEnded, setElEnded] = useState(false);
  const [voterCount, setVoterCount] = useState(undefined);

  const [voterName, setVoterName] = useState("");
  const [voterPhone, setVoterPhone] = useState("");
  const [voterEmail, setVoterEmail] = useState("");

  const [voterData, setVoterData] = React.useState({
    current_picture: "",
  });

  const [capturedImage, setCapturedImage] = useState(false);

  const [voters, setVoters] = useState([]);
  const [currentVoter, setCurrentVoter] = useState({
    address: undefined,
    name: null,
    phone: null,
    photo: null,
    email: null,
    hasVoted: false,
    isVerified: false,
    isRegistered: false,
  });

  useEffect(() => {
    const loadWeb3AndContract = async () => {
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

        const voterCount = await instance.methods.getTotalVoter().call();
        setVoterCount(voterCount);

        const loadedVoters = [];
        for (let i = 0; i < voterCount; i++) {
          const voterAddress = await instance.methods.voters(i).call();
          const voter = await instance.methods
            .voterDetails(voterAddress)
            .call();
          loadedVoters.push({
            address: voter.voterAddress,
            name: voter.name,
            phone: voter.phone,
            photo: voter.imageUrl,
            email: voter.email,
            hasVoted: voter.hasVoted,
            isVerified: voter.isVerified,
            isRegistered: voter.isRegistered,
          });
        }
        setVoters(loadedVoters);

        const voterDetails = await instance.methods
          .voterDetails(accounts[0])
          .call();
        setCurrentVoter({
          address: voterDetails.voterAddress,
          name: voterDetails.name,
          phone: voterDetails.phone,
          photo: voterDetails.imageUrl,
          email: voterDetails.email,
          hasVoted: voterDetails.hasVoted,
          isVerified: voterDetails.isVerified,
          isRegistered: voterDetails.isRegistered,
        });
      } catch (error) {
        console.error(error);
        alert(
          "Failed to load web3, accounts, or contract. Check the console for details (F12)."
        );
      }
    };

    loadWeb3AndContract();
  }, []);

  const sendFileToIPFS = async (fileImg) => {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);
      const resFile = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "c811437c0bff9792455b",
          pinata_secret_api_key:
            "be6ad628ad8c0b3e92c4119377539e346f1b0977e4a6647ef74ea5af99dfe5e0",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File Uploaded to IPFS: ");
      console.log(resFile.data.IpfsHash);
      return resFile?.data?.IpfsHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const registerAsVoter = async (e) => {
    e.preventDefault();
    const imageFile = dataURLtoFile(
      voterData.current_picture,
      `${voterName}.png`
    );
    const requestData = {
      image: voterData.current_picture,
      label: voterName,
    };
    const current_modified_picture = await sendFileToIPFS(imageFile);

    try {
      await ElectionInstance.methods
        .registerAsVoter(
          voterName,
          voterPhone,
          current_modified_picture,
          voterEmail
        )
        .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const captureImage = () => {
    setCapturedImage(true);
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
    <Box sx={{ backgroundColor: "#20a5ff" }}>
      {isAdmin ? <AdminNavbar /> : <UserNavbar />}
      {!elStarted && !elEnded ? (
        <NotInit />
      ) : (
        <>
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
              Total registered voters: {voters.length}
            </Box>
          </Box>
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
              sx={{ fontSize: "1.85rem", marginBottom: "1rem" }}
            >
              Registration
            </Typography>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ fontSize: "1.3rem", color: "#fff" }}
            >
              Register to vote.
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
              <Box component="form" onSubmit={registerAsVoter}>
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
                      value={voterName}
                      type="text"
                      onChange={(e) => setVoterName(e.target.value)}
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
                      type="email"
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
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
                      Number:
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      label="Number"
                      variant="outlined"
                      required
                      type="number"
                      value={voterPhone}
                      onChange={(e) => setVoterPhone(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1, width: "35ch" },
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<AddAPhotoIcon />}
                      size="large"
                      onClick={handleOpen}
                    >
                      Capture Photo
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: isMobile ? "90%" : isTablet ? "70%" : "40%",
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          borderRadius: "20px",
                        }}
                      >
                        <Camera
                          voterData={voterData}
                          setVoterData={setVoterData}
                        />
                      </Box>
                    </Modal>
                  </Box>
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#fc6348" }}>
                      Note:
                    </Typography>
                    <Typography variant="body-1">
                      Make sure your account address and phone number are
                      correct.
                      <br />
                      Admin might not approve your account if the provided phone
                      number does not match the account address registered in
                      the admin's catalogue.
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="column" justifyContent="end" alignItems="end">
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1, width: "35ch" },
                      marginTop: "2rem",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={
                        currentVoter.isRegistered ? (
                          <SyncAltIcon />
                        ) : (
                          <HowToRegIcon />
                        )
                      }
                      size="large"
                      type="submit"
                      disabled={
                        voterPhone.length !== 10 ||
                        currentVoter.isVerified ||
                        voterData.current_picture === ""
                      }
                    >
                      {currentVoter.isRegistered ? "Update" : "Register"}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>

          <LoadCurrentVoters
            currentVoter={currentVoter}
            isRegistered={currentVoter.isRegistered}
          />
          {isAdmin ? (
            <>
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
                    backgroundColor: "#ddffdd",
                    width: isMobile ? "95%" : isTablet ? "75%" : "70%",
                    borderRadius: "10px",
                  }}
                >
                  List of all voters
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: theme.spacing(isMobile ? 2 : 3),
                  marginLeft: isMobile ? "2%" : isTablet ? "10%" : "14%",
                }}
              >
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  component="h1"
                  sx={{ fontSize: "1.3rem", color: "#fff" }}
                >
                  Total Voters:{voters.length}
                </Typography>
              </Box>
              <LoadAllVoters voters={voters} />
            </>
          ) : null}
        </>
      )}
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function LoadCurrentVoters({ currentVoter, isRegistered }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
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
          backgroundColor: "#fffbde",
          width: isMobile ? "95%" : isTablet ? "75%" : "70%",
          borderRadius: "10px",
        }}
      >
        Your Registered Info
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing(isMobile ? 2 : 3),
          marginTop: "2rem",
          backgroundColor: "#fffbde",
          width: isMobile ? "95%" : isTablet ? "75%" : "70%",
          borderRadius: "10px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Account Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.address}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.name}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Email
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.email}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Phone
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.phone}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Photo
                </StyledTableCell>
                <StyledTableCell align="left">
                  <a
                    style={{ color: "black" }}
                    href={`https://gateway.pinata.cloud/ipfs/${currentVoter.photo}`}
                  >
                    {currentVoter.photo}{" "}
                  </a>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Voted
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.hasVoted ? "True" : "False"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Verification
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.isVerified ? "True" : "False"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Registered
                </StyledTableCell>
                <StyledTableCell align="left">
                  {currentVoter.isRegistered ? "True" : "False"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

function LoadAllVoters({ voters }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const renderVoters = (voter) => {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing(isMobile ? 2 : 3),
              backgroundColor: "#ddffdd",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
              marginBottom: "2rem",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Account Address
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.address}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Name
                    </StyledTableCell>
                    <StyledTableCell align="left">{voter.name}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Email
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.email}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Phone
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.phone}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Photo
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <a
                        style={{ color: "black" }}
                        href={`https://gateway.pinata.cloud/ipfs/${voter.photo}`}
                      >
                        {voter.photo}{" "}
                      </a>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Voted
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.hasVoted ? "True" : "False"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Verification
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.isVerified ? "True" : "False"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Registered
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {voter.isRegistered ? "True" : "False"}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  };
  return <>{voters.map(renderVoters)}</>;
}
