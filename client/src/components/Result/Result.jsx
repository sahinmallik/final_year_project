import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
  TableCell,
  tableCellClasses,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  styled,
  TableHead,
  Grid,
  Stack,
} from "@mui/material";
import UserNavbar from "../UserNavbar/UserNavbar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Election from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";
import NotInit from "../../NotInit";
// const TableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const TableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const Result = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [web3, setWeb3] = useState(null);
  const [ElectionInstance, setElectionInstance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [isElStarted, setElStarted] = useState(false);
  const [isElEnded, setElEnded] = useState(false);

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
        for (let i = 1; i <= candidateCount; i++) {
          const candidate = await instance.methods
            .candidateDetails(i - 1)
            .call();
          loadedCandidates.push({
            id: candidate.candidateId,
            header: candidate.header,
            slogan: candidate.slogan,
            voteCount: candidate.voteCount,
          });
        }
        setCandidates(loadedCandidates);

        const start = await instance.methods.getStart().call();
        setElStarted(start);
        const end = await instance.methods.getEnd().call();
        setElEnded(end);
      } catch (error) {
        console.error("Failed to load web3, accounts, or contract", error);
      }
    };
    loadWeb3AndContract();
  }, []);

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <UserNavbar />}
      <Box>
        {!isElStarted && !isElEnded ? (
          <NotInit />
        ) : isElStarted && !isElEnded ? (
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
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h4"
                sx={{ marginBottom: "1rem" }}
              >
                The election is being conducted at the moment.
              </Typography>
              <Typography
                variant={isMobile ? "p" : "p"}
                component="p"
                sx={{ marginBottom: "1rem" }}
              >
                Result will be displayed once the election has ended.
              </Typography>
              <Typography
                variant={isMobile ? "p" : "p"}
                component="p"
                sx={{ marginBottom: "1rem" }}
              >
                Go ahead and cast your vote.
              </Typography>
              <Link href="/voting" color="inherit">
                {"Voting Page"}
              </Link>
            </Box>
          </Box>
        ) : !isElStarted && isElEnded ? (
          <DisplayResults
            isMobile={isMobile}
            isTablet={isTablet}
            theme={theme}
            candidates={candidates}
          />
        ) : null}
      </Box>
    </>
  );
};

function DisplayResults({ isMobile, isTablet, theme, candidates }) {
  const getWinner = (candidates) => {
    let maxVoteReceived = 0;
    let winnerCandidates = [];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].voteCount > maxVoteReceived) {
        maxVoteReceived = candidates[i].voteCount;
        winnerCandidates = [candidates[i]];
      } else if (candidates[i].voteCount === maxVoteReceived) {
        winnerCandidates.push(candidates[i]);
      }
    }
    return winnerCandidates;
  };

  const winnerCandidates = getWinner(candidates);
  // console.log(winnerCandidates);

  const renderResults = (candidate) => (
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
          borderRadius: "10px",
          width: isMobile ? "95%" : isTablet ? "75%" : "70%",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Id
                </TableCell>
                <TableCell align="left">Candidate</TableCell>
                <TableCell align="left">Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="td" scope="row">
                  {candidate.id.toString()}
                </TableCell>
                <TableCell align="left">{candidate.header}</TableCell>
                <TableCell align="left">
                  {candidate.voteCount.toString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  function renderWinner(winner) {
    console.log(winner.voteCount);
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
            backgroundColor: "#f2f2f2",
            borderRadius: "10px",
            width: isMobile ? "95%" : isTablet ? "65%" : "55%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                component="h5"
                color={"#33cd33"}
                sx={{ marginBottom: "1rem" }}
              >
                Winner!
              </Typography>
              <Typography
                variant="h3"
                component="h3"
                sx={{ marginBottom: "2rem" }}
              >
                {winner.header}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                color={"rgb(213, 80, 13)"}
              >
                {winner.slogan}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                component="h5"
                color={"#706f6f"}
                sx={{ marginBottom: "1rem", marginTop: "2rem" }}
              >
                Total Votes:
              </Typography>
              <Typography variant="h2" component="h2">
                {winner.voteCount.toString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      {winnerCandidates.map(renderWinner)}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: isMobile ? "0%" : isTablet ? "15%" : "15%",
          marginTop: "2rem",
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} component="h1">
          Results
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{ fontSize: "1.3rem", color: "#fff", marginTop: "0.5rem" }}
        >
          Total Candidates: {candidates.length}
        </Typography>
      </Box>
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
              marginTop: "2rem",
              backgroundColor: "#fffbde",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"} component="h1">
              No Candidate! No Result!
            </Typography>
          </Box>
        </Box>
      ) : (
        <>{candidates.map(renderResults)}</>
      )}
    </div>
  );
}

export default Result;
