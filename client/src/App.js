import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
// import UserNavbar from "./components/UserNavbar/UserNavbar";
import AdminNavbar from "./components/UserNavbar/AdminNavbar";
import UserNavbar from "./components/UserNavbar/UserNavbar";
import Home from "./components/Home";
import Registration from "./components/Registration/Registration";
import Result from "./components/Result/Result";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connect" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Box>
  );
}

export default App;
