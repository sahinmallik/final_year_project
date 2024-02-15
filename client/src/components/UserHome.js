import React from "react";
import {
  useTheme,
  Box,
  useMediaQuery,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
// import {  } from "@mui/material/useMediaQuery";

function UserHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
        <Typography
          variant={isMobile ? "h3" : "h4"}
          component="h1"
          marginBottom={"2rem"}
        >
          Election Name
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h3"
          marginBottom={"2rem"}
        >
          Organization Name
        </Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Table sx={{ maxWidth: 400 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant={isMobile ? "h6" : "h5"} component="h4">
                  Admin Name:
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant={isMobile ? "h6" : "h5"} component="h4">
                  Admin Name
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant={isMobile ? "h6" : "h5"} component="h4">
                  Contact:
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant={isMobile ? "h6" : "h5"} component="h4">
                  Email
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </Box>
  );
}

export default UserHome;
