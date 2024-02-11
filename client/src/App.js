import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
// import UserNavbar from "./components/UserNavbar/UserNavbar";
import AdminNavbar from "./components/UserNavbar/AdminNavbar";
import UserNavbar from "./components/UserNavbar/UserNavbar";

function App() {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connect" element={<UserNavbar />} />
      </Routes>
    </Box>
  );
}

export default App;
