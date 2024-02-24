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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "../Navbar/Navbar.css";
import NotInit from "../../NotInit";

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
          height: "10vh",
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
          <AdminPanelSettingsIcon
            sx={{ fontSize: 40, color: "#fff", mr: "5px" }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
            }}
          >
            Admin
          </Typography>
        </Button>
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          onClick={handleDrawerOpen}
          sx={{
            display: { xs: "block", sm: "block", md: "block" },
            color: "#fff",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} to="/verification">
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Verification" />
          </ListItem>
          <ListItem button component={Link} to="/registration">
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </ListItem>
          <ListItem button component={Link} to="/add-candidate">
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Candidate" />
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
      {/* <NotInit /> */}
    </>
  );
};

export default UserNavbar;
