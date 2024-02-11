import * as React from "react";
import { Box, useMediaQuery, useTheme, Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdminNavbar from "./UserNavbar/AdminNavbar";

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
          padding: theme.spacing(isMobile ? 2 : 3),
          marginLeft: isMobile ? "0%" : isTablet ? "11%" : "19%",
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
            backgroundColor: "#fff",
            borderRadius: "20px",
            width: isMobile ? "95%" : isTablet ? "65%" : "53%",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              Name:
            </Typography>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              required
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              Email:
            </Typography>
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
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              Job Title:
            </Typography>
            <TextField
              id="outlined-basic"
              label="job title"
              variant="outlined"
              required
            />
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(isMobile ? 2 : 3),
          marginLeft: isMobile ? "0%" : isTablet ? "11%" : "19%",
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
            backgroundColor: "#fff",
            borderRadius: "20px",
            width: isMobile ? "95%" : isTablet ? "65%" : "53%",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              Election Title:
            </Typography>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              Organization Name:
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
