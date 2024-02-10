import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import {  } from "@mui/material/useMediaQuery";

const ElectionStatus = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(isMobile ? 2 : 3),
        borderTop: "1px solid",
      }}
    >
      <Typography variant={isMobile ? "h5" : "h6"} component="h3" gutterBottom>
        Election Status
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={isMobile ? 12 : 6}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: theme.spacing(isMobile ? 1 : 2),
              borderRadius: "1em",
            }}
          >
            <Typography variant="body1">Started:</Typography>
            <Tooltip
              title={true ? "Election has started" : "Election has not started"}
            >
              <Typography variant="body1">{true ? "True" : "False"}</Typography>
            </Tooltip>
          </Paper>
        </Grid>
        {isMobile ? (
          <Grid item xs={12}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: theme.spacing(isMobile ? 1 : 2),
                borderRadius: "1em",
              }}
            >
              <Typography variant="body1">Ended:</Typography>
              <Tooltip
                title={true ? "Election has ended" : "Election is ongoing"}
              >
                <Typography variant="body1">
                  {true ? "True" : "False"}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={6}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: theme.spacing(isMobile ? 1 : 2),
                borderRadius: "1em",
              }}
            >
              <Typography variant="body1">Ended:</Typography>
              <Tooltip
                title={true ? "Election has ended" : "Election is ongoing"}
              >
                <Typography variant="body1">
                  {true ? "True" : "False"}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ElectionStatus;
