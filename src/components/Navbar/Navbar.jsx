import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const { mode, toggleTheme } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mr: 5,
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          Movie Explorer
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => navigate("/favorites")}>
            Favorites
          </Button>

          <Button color="inherit" onClick={() => navigate("/search")}>
            Search
          </Button>
        </Box>

        <Button color="inherit" onClick={handleMenuOpen}>
          {username} ▼
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              toggleTheme();
              handleMenuClose();
            }}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
