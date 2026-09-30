import { useState, useEffect } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("username", username);

    navigate("/home");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background:
          "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.85)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80')",

        backgroundSize: "cover",

        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,

            borderRadius: 6,

            textAlign: "center",

            backdropFilter: "blur(20px)",

            background: theme.palette.background.paper,

            border: `1px solid ${theme.palette.divider}`,

            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#E50914",

              fontWeight: 800,

              mb: 1,
            }}
          >
            MOVIEFLIX
          </Typography>

          <Typography
            sx={{
              color: theme.palette.text.secondary,

              mb: 4,
            }}
          >
            Sign in to continue your movie journey
          </Typography>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              py: 1.5,

              background: "#E50914",

              fontWeight: 700,

              "&:hover": {
                background: "#B20710",
              },
            }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
