import React from "react";

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
import AdminNavbar from "../UserNavbar/AdminNavbar";
import NotInit from "../../NotInit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Camera from "./Camera";

export default function Registration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [voterData, setVoterData] = React.useState({
    current_picture: "",
  });

  return (
    <Box>
      <AdminNavbar />
      {/* <NotInit /> */}
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
          Total registered voters: 0
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
          <Stack direction="column" justifyContent="center" alignItems="center">
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
                Name:
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
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
                Email:
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
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
                Number:
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Number"
                variant="outlined"
                required
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
                  <Camera voterData={voterData} setVoterData={setVoterData} />
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
                Make sure your account address and phone number are correct.
                <br />
                Admin might not approve your account if the provided phone
                number does not match the account address registered in the
                admin's catalogue.
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
                startIcon={<HowToRegIcon />}
                size="large"
              >
                Register
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <LoadCurrentVoters />
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
      <LoadAllVoters />
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

function LoadCurrentVoters() {
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
                  0x0000000000000000000000000000000000000000
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">hi</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Email
                </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Phone
                </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Photo
                </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Voted
                </StyledTableCell>
                <StyledTableCell align="left">False</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Verification
                </StyledTableCell>
                <StyledTableCell align="left">False</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Registered
                </StyledTableCell>
                <StyledTableCell align="left">False</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

function LoadAllVoters() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
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
          Total Voters:0
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
                    0x0000000000000000000000000000000000000000
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="left">hi</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Email
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Phone
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Photo
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Voted
                  </StyledTableCell>
                  <StyledTableCell align="left">False</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Verification
                  </StyledTableCell>
                  <StyledTableCell align="left">False</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Registered
                  </StyledTableCell>
                  <StyledTableCell align="left">False</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
