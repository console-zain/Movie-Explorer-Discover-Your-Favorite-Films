import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { useNavigate, useLocation } from "react-router-dom";

import { useThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const theme = useTheme();

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

  const navButtonStyle = (path) => ({
    color:
      location.pathname === path
        ? theme.palette.text.primary
        : theme.palette.text.secondary,

    background:
      location.pathname === path
        ? mode === "dark"
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.08)"
        : "transparent",

    borderRadius: "999px",

    px: 3,

    textTransform: "none",

    fontWeight: 600,

    "&:hover": {
      background:
        mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",

      color: theme.palette.text.primary,
    },
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",

        boxShadow: "none",

        display: "flex",

        alignItems: "center",

        pt: 2,
      }}
    >
      <Toolbar
        sx={{
          width: "fit-content",

          minHeight: "70px",

          px: 2,

          borderRadius: "999px",

          backdropFilter: "blur(20px)",

          background:
            mode === "dark" ? "rgba(31,31,31,0.75)" : "rgba(255,255,255,0.75)",

          border: `1px solid ${theme.palette.divider}`,

          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h6"
          onClick={() => navigate("/home")}
          sx={{
            color: "#E50914",

            fontWeight: 800,

            cursor: "pointer",

            mr: 3,

            letterSpacing: "1px",
          }}
        >
          MOVIEFLIX
        </Typography>

        <Button sx={navButtonStyle("/home")} onClick={() => navigate("/home")}>
          Home
        </Button>

        <Button
          sx={navButtonStyle("/favorites")}
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </Button>

        <Button
          sx={navButtonStyle("/search")}
          onClick={() => navigate("/search")}
        >
          Search
        </Button>

        <Box sx={{ ml: 2 }}>
          <Button
            onClick={handleMenuOpen}
            sx={{
              color: theme.palette.text.primary,

              borderRadius: "999px",

              textTransform: "none",

              px: 1.5,

              "&:hover": {
                background:
                  mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,

                height: 32,

                mr: 1,

                bgcolor: "#E50914",

                fontSize: "0.9rem",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>

            {username}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,

                backdropFilter: "blur(20px)",

                background: theme.palette.background.paper,

                border: `1px solid ${theme.palette.divider}`,

                color: theme.palette.text.primary,

                borderRadius: 3,
              },
            }}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
