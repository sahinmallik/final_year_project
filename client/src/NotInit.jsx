import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const NotInit = () => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      height={isTabletOrMobile ? "calc(100vh - 6vh)" : "89.98vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ background: "#a2defa", borderRadius: "40px" }} p={15}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant={isTabletOrMobile ? "h6" : "h5"}>
            The election has not been initialized.
          </Typography>
          <Typography variant={isTabletOrMobile ? "body2" : "h6"}>
            Please wait...
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotInit;
