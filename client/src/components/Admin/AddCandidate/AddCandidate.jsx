import React, { useState, useEffect } from "react";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import getWeb3 from "../../../getWeb3";
import Election from "../../../contracts/Election.json";

import {
  Box,
  useTheme,
  useMediaQuery,
  InputLabel,
  TextField,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  TableRow,
  Paper,
  styled,
  Button,
} from "@mui/material";
export default function Registration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [web3, setWeb3] = useState(null);
  const [ElectionInstance, setElectionInstance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [header, setHeader] = useState("");
  const [slogan, setSlogan] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);

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

        const candidateCount = await instance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);
        const loadedCandidates = [];
        for (let i = 0; i < candidateCount; i++) {
          const candidate = await instance.methods.candidateDetails(i).call();
          loadedCandidates.push({
            id: candidate.candidateId,
            header: candidate.header,
            slogan: candidate.slogan,
          });
        }
        setCandidates(loadedCandidates);
      } catch (error) {
        console.error(error);
        alert(
          "Failed to load web3, accounts, or contract. Check the console for details (F12)."
        );
      }
    };

    loadWeb3AndContract();
  }, []);

  const addCandidate = async (e) => {
    e.preventDefault();
    try {
      await ElectionInstance.methods
        .addCandidate(header, slogan)
        .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to add candidate. Check the console for details (F12).");
    }
  };

  return (
    <Box>
      <AdminNavbar />
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
          Total candidate: {candidates.length}
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
          Add a new candidate
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
          <Box component="form" onSubmit={addCandidate}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "35ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <InputLabel
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  Candidate Name:
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  required
                  value={header}
                  onChange={(e) => {
                    setHeader(e.target.value);
                  }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "35ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <InputLabel
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  Slogan:
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  label="Slogan"
                  variant="outlined"
                  required
                  value={slogan}
                  onChange={(e) => {
                    setSlogan(e.target.value);
                  }}
                />
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
                  startIcon={<HowToRegIcon />}
                  size="large"
                  type="submit"
                  disabled={header.length < 3 || header.length > 21}
                >
                  Add
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
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
          List of all candidates
        </Box>
      </Box>
      <LoadAllVoters candidates={candidates} />
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

function LoadAllVoters({ candidates }) {
  // Dummy data for demonstration

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  console.log(candidates);
  const renderAdded = (candidate) => {
    return (
      <Box
        key={candidate.id}
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
        <TableContainer>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {candidate.header}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  Slogan
                </StyledTableCell>
                <StyledTableCell align="left">
                  {candidate.slogan}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  return (
    <Box>
      {candidates.length < 1 ? (
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
              backgroundColor: "#fffbde",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5" component="h1" sx={{ fontSize: "1.5rem" }}>
              No candidates added.
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
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
              Total Candidate: {candidates.length}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {candidates.map(renderAdded)}
          </Box>
        </>
      )}
    </Box>
  );
}
