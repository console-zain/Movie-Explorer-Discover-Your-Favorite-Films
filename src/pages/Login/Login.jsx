import { useState, useEffect } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Movie Explorer
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Login to continue
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
