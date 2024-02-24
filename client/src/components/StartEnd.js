import React from "react";
import {
  useTheme,
  Box,
  Button,
  useMediaQuery,
  Typography,
  Link,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
const StartEnd = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {!props.elStarted ? (
        <>
          {!props.elEnded ? (
            <>
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
                  marginTop: "2rem",
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
                  padding: isMobile ? theme.spacing(2) : "2rem",
                  backgroundColor: "#f2f2f2",
                  borderRadius: "20px",
                  width: isMobile ? "95%" : isTablet ? "65%" : "53%",
                  margin: "2rem",
                  "& button": { m: 1 },
                }}
              >
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "55ch" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="submit"
                    startIcon={<HowToVoteIcon />}
                  >
                    Start Election
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: isMobile ? theme.spacing(2) : "2rem",
                backgroundColor: "#f2f2f2",
                borderRadius: "20px",
                "& button": { m: 1 },
                marginTop: "2rem",
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h3"
                sx={{ fontSize: "1.8rem" }}
              >
                Re-deploy the contract to start election again.
              </Typography>
            </Box>
          )}
          {props.elEnded ? (
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
                marginTop: "2rem",
              }}
            >
              <Typography variant={isMobile ? "h6" : "h5"} component="h4">
                The Election has ended.
              </Typography>
            </Box>
          ) : null}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? theme.spacing(2) : "2rem",
            backgroundColor: "#f2f2f2",
            borderRadius: "20px",
            width: isMobile ? "95%" : isTablet ? "65%" : "53%",
            "& button": { m: 1 },
            marginTop: "2rem",
          }}
        >
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "55ch" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              color="error"
              startIcon={<DoDisturbIcon />}
              onClick={props.endElFn}
            >
              End Election
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StartEnd;
