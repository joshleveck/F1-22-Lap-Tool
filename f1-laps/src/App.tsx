import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Compare from "./pages/Compare/index";
import Navbar from "./pages/Navbar";
import Saved from "./pages/Saved";
import Recording from "./pages/Recording";

function App() {
  return (
    <Router>
      <Box
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Recording />}></Route>
          <Route path="/saved" element={<Saved />}></Route>
          <Route path="/compare" element={<Compare />}></Route>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
