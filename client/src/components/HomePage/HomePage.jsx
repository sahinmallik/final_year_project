import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import "./HomePage.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Stack
        direction="row"
        p={2}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "86.8vh",
        }}
      >
        <Box
          sx={{
            width: "60%",
          }}
        >
          <Typography
            variant="h1"
            className="main-heading"
            p={2}
            sx={{ fontSize: "5.3rem", fontWeight: "700", mr: "20px" }}
          >
            Electronic Voting System: Secure, Transparent, and Tamper-Proof
          </Typography>
          <Typography
            variant="subtitle1"
            p={2}
            sx={{ fontSize: "1.1rem", textAlign: "justify" }}
          >
            A blockchain-based voting system revolutionizes the electoral
            process by leveraging the transparent and immutable nature of
            blockchain technology. Through distributed consensus, it eliminates
            the need for intermediaries, ensuring secure and tamper-proof
            voting.
          </Typography>
          <Button
            component={Link}
            to="/connect"
            p={2}
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
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.thequint.com/thequint%2F2022-01%2Fe1102b09-2a0d-47a3-a7d8-58d61ef55daf%2FiStock_1151894524.jpg"
            alt="logo"
            height={550}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
