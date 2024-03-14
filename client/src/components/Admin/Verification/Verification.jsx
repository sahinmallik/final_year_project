import React from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  Paper,
  Table,
  TableContainer,
  TableBody,
  Stack,
  Button,
} from "@mui/material";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Election from "../../../contracts/Election.json";
import getWeb3 from "../../../getWeb3";
import { useEffect, useState } from "react";
import UserNavbar from "../../AdminNavbar/AdminNavbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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

const Verification = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [voterCount, setVoterCount] = useState(undefined);

  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
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

        const candidateCount = await instance.methods
          .getTotalCandidate()
          .call();
        const admin = await instance.methods.getAdmin().call();

        if (accounts[0] === admin) {
          setIsAdmin(true);
        }

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
            hasVoted: voter.hasVoted,
            isVerified: voter.isVerified,
            isRegistered: voter.isRegistered,
          });
        }
        setVoters(loadedVoters);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    loadBlockchainData();
  }, []);

  const verifyVoter = async (verifiedStatus, address) => {
    try {
      await ElectionInstance.methods
        .verifyVoter(verifiedStatus, address)
        .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
      window.location.reload();
    } catch (error) {
      alert(`Failed to verify voter. Check console for details.`);
      console.error(error);
    }
  };

  const renderUnverifiedVoters = (voter) => {
    return (
      <>
        {voter.isVerified ? (
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
              <TableContainer>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Account Address
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.address}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Name
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.name}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Phone
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.phone}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Photo
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <a
                          style={{ color: "black" }}
                          href={`https://gateway.pinata.cloud/ipfs/${voter.photo}`}
                        >
                          {voter.photo}
                        </a>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Voted
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.hasVoted ? "True" : "False"}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        ) : (
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
              <TableContainer>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Account Address
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.address}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Name
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.name}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Phone
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.phone}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Photo
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <a
                          style={{ color: "black" }}
                          href={`https://gateway.pinata.cloud/ipfs/${voter.photo}`}
                        >
                          {voter.photo}
                        </a>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Voted
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.hasVoted ? "True" : "False"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Verification
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.isVerified ? "True" : "False"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Registered
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {voter.isRegistered ? "True" : "False"}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction="column" justifyContent="end" alignItems="end">
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "50ch" },
                    marginTop: "0.5rem",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<VerifiedUserIcon />}
                    color="success"
                    size="large"
                    type="submit"
                    disabled={voter.isVerified}
                    onClick={() => verifyVoter(true, voter.address)}
                  >
                    Approve
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
      </>
    );
  };

  if (!web3) {
    return (
      <>
        {isAdmin ? <AdminNavbar /> : <UserNavbar />}
        <center>Loading Web3, accounts, and contract...</center>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
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
          Verification
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{ fontSize: "1.3rem", color: "#fff" }}
        >
          Total Voters: {voters.length}
        </Typography>
      </Box>
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
            backgroundColor: "#ddffff",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",

            borderRadius: "10px",
          }}
        >
          List of Registered Voters
        </Box>
      </Box>
      {voters.map(renderUnverifiedVoters)}
    </>
  );
};

export default Verification;
