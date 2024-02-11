import React from "react";
import { useTheme, Box, Typography, Paper, useMediaQuery } from "@mui/material";
// import { useMediaQuery } from "@mui/material/useMediaQuery";

const AdminOnly = ({}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderColor: "tomato",
        ...(isMobile && {
          width: "90%",
          margin: "auto",
          padding: theme.spacing(2),
        }),
      }}
    >
      <Box sx={{ margin: isMobile ? theme.spacing(1) : "17px" }}>
        <Typography variant="h1" component="h1">
          hi hello
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ marginBottom: "17px" }}>
        Admin access only.
      </Typography>
    </Paper>
  );
};

export default AdminOnly;
