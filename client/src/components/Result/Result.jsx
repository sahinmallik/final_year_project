import React from "react";
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
// import AdminNavbar from "../UserNavbar/AdminNavbar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

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
      <DisplayResults isMobile={isMobile} isTablet={isTablet} theme={theme} />
    </Box>
  );
};

function DisplayResults({ isMobile, isTablet, theme }) {
  const renderResults = () => (
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
                  0
                </TableCell>
                <TableCell align="left">Amlan</TableCell>
                <TableCell align="left">0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  function renderWinner() {
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
                Amlan
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                color={"rgb(213, 80, 13)"}
              >
                Slogan
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
                0
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      {renderWinner()}
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
          Total Candidates: 0
        </Typography>
      </Box>
      {renderResults()}
    </div>
  );
}

export default Result;
