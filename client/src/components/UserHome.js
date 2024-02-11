import React from "react";
import {
  useTheme,
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  useMediaQuery,
} from "@mui/material";
// import {  } from "@mui/material/useMediaQuery";

function UserHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? theme.spacing(2) : "2rem",
      }}
    >
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12}>
          <Typography variant={isMobile ? "h5" : "h4"} component="h1">
            hi
          </Typography>
          <br />
          <Typography variant="body1" textAlign="center">
            hi
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="user-home-table">
              <TableBody>
                <TableRow>
                  <TableCell>admin</TableCell>
                  <TableCell>hi hi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>contact</TableCell>
                  <TableCell>hi</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserHome;
