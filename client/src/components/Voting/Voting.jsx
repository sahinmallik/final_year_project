import React from "react";
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

const Voting = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [voterData, setVoterData] = React.useState({
    current_picture: "",
  });

  const renderCandidates = () => {
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
                  Name{" "}
                  <span style={{ color: "white", fontSize: "1.2rem" }}>#0</span>
                </Typography>
                <Typography variant="h5" component="h5">
                  Slogan
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
              >
                Vote
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

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
          {voterData.current_picture ? (
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
          Total Candidates: 0
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
      {renderCandidates()}
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

export default Voting;
