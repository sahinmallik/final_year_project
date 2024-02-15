import React from "react";
import {
  useTheme,
  Box,
  Button,
  useMediaQuery,
  Typography,
  Link,
} from "@mui/material";

const StartEnd = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? theme.spacing(2) : "2rem",
          backgroundColor: "#f2f2f2",
          borderRadius: "20px",
          width: isMobile ? "95%" : isTablet ? "65%" : "53%",
          margin: "2rem",
          "& button": { m: 1 },
        }}
      >
        <Button variant="outlined" size="large" color="primary">
          Start Election
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? theme.spacing(2) : "2rem",
          backgroundColor: "#f2f2f2",
          borderRadius: "20px",
          width: isMobile ? "95%" : isTablet ? "65%" : "53%",
          "& button": { m: 1 },
        }}
      >
        <Button variant="outlined" size="large" color="error">
          End Election
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? theme.spacing(2) : "2rem",
          backgroundColor: "#f2f2f2",
          borderRadius: "20px",
          width: isMobile ? "95%" : isTablet ? "65%" : "53%",
          "& button": { m: 1 },
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} component="h4">
          The Election has ended.
        </Typography>
      </Box>
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
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h3"
          sx={{ marginBottom: "1rem" }}
        >
          Do not forget to add candidates.
        </Typography>
        <Typography variant={isMobile ? "p" : "p"} component="p">
          Go to{" "}
          <Link href="/add-candidate" color="inherit">
            {"Add Candidates"}
          </Link>{" "}
          page.
        </Typography>
      </Box>
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
        <Typography variant={isMobile ? "h5" : "h4"} component="h3">
          Re-deploy the contract to start election again.
        </Typography>
      </Box>
    </>
  );
};

export default StartEnd;
