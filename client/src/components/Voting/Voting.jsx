import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Link,
  Button,
  Modal,
  Grid,
  Stack,
} from "@mui/material";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PollIcon from "@mui/icons-material/Poll";
import Camera from "../Registration/Camera";
import Election from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

const Voting = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [voterData, setVoterData] = useState({
    current_picture: "",
  });

  const [web3, setWeb3] = useState(null);
  const [electionInstance, setElectionInstance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(null);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [currentVoter, setCurrentVoter] = useState({
    address: undefined,
    name: null,
    phone: null,
    hasVoted: false,
    isVerified: false,
    isRegistered: false,
    faceVerified: false,
  });

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.requestAccounts();
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
        setCandidateCount(candidateCount);

        console.log(candidateCount);
        const start = await instance.methods.getStart().call();
        setIsElStarted(start);
        const end = await instance.methods.getEnd().call();
        setIsElEnded(end);

        const loadedCandidates = [];
        for (let i = 1; i <= candidateCount; i++) {
          const candidate = await instance.methods
            .candidateDetails(i - 1)
            .call();
          loadedCandidates.push({
            id: candidate.candidateId,
            header: candidate.header,
            slogan: candidate.slogan,
          });
        }
        setCandidates(loadedCandidates);

        const voter = await instance.methods.voterDetails(accounts[0]).call();
        setCurrentVoter({
          address: voter.voterAddress,
          name: voter.name,
          phone: voter.phone,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
          faceVerified: voter.faceVerified,
        });

        const admin = await instance.methods.getAdmin().call();
        setIsAdmin(accounts[0] === admin);
      } catch (error) {
        console.error(error);
      }
    };
    loadWeb3AndContract();
  }, [account]);

  return (
    <>
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
            backgroundColor: "#fffbde",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : isTablet ? "h5" : "h4"}
            sx={{ marginBottom: "1rem" }}
          >
            You have casted your vote.
          </Typography>
          <Link href="/result" color="inherit">
            {"Result Page"}
          </Link>
        </Box>
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
            marginTop: "2rem",
            backgroundColor: "#ddffff",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : isTablet ? "h5" : "h4"}
            sx={{ marginBottom: "1rem" }}
          >
            Verify Face before casting your vote.
          </Typography>
          {voterData.current_picture.length < 1 ? (
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AddAPhotoIcon />}
              onClick={handleOpen}
            >
              click Picture
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<VerifiedUserIcon />}
            >
              Verfiy Face
            </Button>
          )}

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
                page="verify face"
              />
            </Box>
          </Modal>
        </Box>
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
            marginTop: "2rem",
            backgroundColor: "#fffbde",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
            borderRadius: "10px",
          }}
        >
          <Typography>Wait for admin to verify.</Typography>
        </Box>
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
            marginTop: "2rem",
            backgroundColor: "#fffbde",
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant={isMobile ? "p" : isTablet ? "p" : "p"}
            sx={{ marginBottom: "1rem" }}
          >
            You're not registered. Please register first.
          </Typography>
          <Link href="/result" color="inherit">
            {"Result Page"}
          </Link>
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
          Candidates
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{ fontSize: "1.3rem", color: "#fff" }}
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
              backgroundColor: "#fffbde",
              width: isMobile ? "95%" : isTablet ? "75%" : "70%",
              borderRadius: "10px",
            }}
          >
            <Typography variant={isMobile ? "p" : isTablet ? "p" : "p"}>
              Not one to vote for.
            </Typography>
          </Box>
        </Box>
      ) : (
        <LoadAllVoters
          candidates={candidates}
          electionInstance={electionInstance}
          account={account}
          web3={web3}
        />
      )}

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
            variant={isMobile ? "h5" : isTablet ? "h5" : "h4"}
            sx={{ marginBottom: "1rem" }}
          >
            Election has ended.
          </Typography>
          <Link href="/result" color="inherit">
            {"Result Page"}
          </Link>
        </Box>
      </Box>
    </>
  );
};

function LoadAllVoters({ candidates, electionInstance, account, web3 }) {
  const castVote = async (id) => {
    try {
      await electionInstance.methods
        .vote(id)
        .send({ from: account, gas: 1000000, gasPrice: 1000000000 });
      window.location.reload();
    } catch (error) {
      console.log(id);
    }
  };

  const confirmVote = (id, header) => {
    var r = window.confirm(
      "Vote for " + header + " with Id " + id + ".\nAre you sure?"
    );
    if (r === true) {
      castVote(id);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const renderAdded = (candidate) => {
    const id = web3.toBigNumber(candidate.id);
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
            width: isMobile ? "95%" : isTablet ? "75%" : "70%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: theme.spacing(isMobile ? 2 : 3),

                  backgroundColor: "#D3D3D3	",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ marginBottom: "1rem" }}
                >
                  {candidate.header}
                  <span style={{ color: "white", fontSize: "1.2rem" }}>
                    {"#" + candidate.id.toString()}
                  </span>
                </Typography>

                <Typography variant="h5" component="h5">
                  {candidate.slogan}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={<PollIcon />}
                sx={{ marginTop: "3rem" }}
                onClick={() => confirmVote(id, candidate.header)}
              >
                Vote
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  return <Box>{candidates.map(renderAdded)}</Box>;
}

export default Voting;
