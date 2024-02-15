import { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import "../Navbar/Navbar.css";
import NotInit from "../../NotInit";
import AdminOnly from "../AdminOnly";
import UserHome from "../UserHome";
import ElectionStatus from "../ElectionStatus";

const UserNavbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          zIndex: 2,
          background: "#000",
          position: "sticky",
          justifyContent: "space-between",
          top: 0,
          height: "6vh",
        }}
      >
        <Button
          component={Link}
          to="/connect"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <HomeOutlinedIcon sx={{ fontSize: 40, color: "#000", mr: "5px" }} />
          <Typography
            variant="h4"
            sx={{
              color: "#000",
            }}
          >
            Home
          </Typography>
        </Button>
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          onClick={handleDrawerOpen}
          sx={{ display: { xs: "block", sm: "block", md: "block" } }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} to="/registration">
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </ListItem>
          <ListItem button component={Link} to="/nomination">
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Nomination" />
          </ListItem>
          <ListItem button component={Link} to="/voting">
            <ListItemIcon>
              <HowToVoteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Voting" />
          </ListItem>
          <ListItem button component={Link} to="/result">
            <ListItemIcon>
              <BadgeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Result" />
          </ListItem>
        </List>
      </Drawer>
      <NotInit />
      <AdminOnly />
      <UserHome />
      <ElectionStatus />
    </>
  );
};

export default UserNavbar;
