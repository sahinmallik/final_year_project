import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        background: "#fff",
        position: "sticky",
        justifyContent: "space-between",
        top: 0,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <img
            src="https://i.ibb.co/kGwJHd6/logo-no-background.png"
            alt="logo"
            height={65}
          />
        </Link>
        <Typography
          variant="h4"
          className="brand-name"
          sx={{
            fontWeight: "bold",
          }}
        >
          Electronic Voting System
        </Typography>
      </Stack>
      <Button
        component={Link}
        to="/connect"
        color="success"
        variant="text"
        sx={{
          padding: "10px 25px",
          fontSize: "1rem",
          borderRadius: "20px",
        }}
      >
        Connect me
      </Button>
    </Stack>
  );
};

export default Navbar;
