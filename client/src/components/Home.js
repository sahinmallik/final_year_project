import * as React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Stack,
  InputLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdminNavbar from "./UserNavbar/AdminNavbar";
import StartEnd from "./StartEnd";
import ElectionStatus from "./ElectionStatus";
import UserHome from "./UserHome";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ backgroundColor: "#00a5ff" }}>
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
          Your Account: dummy
        </Box>
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
          <Typography variant={isMobile ? "h6" : "h6"} component="h5">
            Set up the election.
          </Typography>
        </Box>
      </Box>
      <AdminHome />
    </Box>
  );
}

function AdminHome() {
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
                Job Title:
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="job title"
                variant="outlined"
                required
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
                Election Title:
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                required
                sx={{ width: "25ch" }}
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
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <StartEnd />
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ElectionStatus />
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <UserHome />
      </Stack>
    </Box>
  );
}
