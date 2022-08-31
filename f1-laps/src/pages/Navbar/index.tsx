import React from "react";
import { useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Box, Button, AppBar, Toolbar, IconButton } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LogoDevIcon />
          </IconButton>
          <Button
            color="inherit"
            sx={{ mr: 2, ml: 4 }}
            onClick={() => handleClick("/")}
          >
            Record Lap
          </Button>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => handleClick("/saved")}
          >
            Saved Laps
          </Button>
          <Button color="inherit" onClick={() => handleClick("/compare")}>
            Compare Laps
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
