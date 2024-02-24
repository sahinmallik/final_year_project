import React from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
const ElectionStatus = (props) => {
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
        padding: isMobile ? theme.spacing(2) : "2rem",
        backgroundColor: "#f2f2f2",
        borderRadius: "20px",
        width: isMobile ? "95%" : isTablet ? "65%" : "53%",
        margin: "2rem",
      }}
    >
      <Typography variant={isMobile ? "h6" : "h5"} component="h4">
        Election Status: {props.elStarted ? "Started" : "Not Started"}
      </Typography>
    </Box>
  );
};

export default ElectionStatus;
