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

  const renderUnverifiedVoters = () => {
    return (
      <>
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
                      currentVoter.address
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
                      currentVoter.name
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
                      currentVoter.phone
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
                      <a style={{ color: "black" }}>currentVoter.photo </a>
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
                      currentVoter.hasVoted ? "True" : "False"
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
                      currentVoter.isVerified ? "True" : "False"
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
                      currentVoter.isRegistered ? "True" : "False"
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
                >
                  Approve
                </Button>
              </Box>
            </Stack>
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
                      currentVoter.address
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
                      currentVoter.name
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
                      currentVoter.phone
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
                      <a style={{ color: "black" }}>currentVoter.photo </a>
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
                      currentVoter.hasVoted ? "True" : "False"
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  };

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
          Total Voters: 0
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
      {renderUnverifiedVoters()}
    </>
  );
};

export default Verification;
