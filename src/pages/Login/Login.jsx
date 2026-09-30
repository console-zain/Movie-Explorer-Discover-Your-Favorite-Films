import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const Login = () => {
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

        <TextField fullWidth label="Username" margin="normal" />

        <TextField fullWidth label="Password" type="password" margin="normal" />

        <Button variant="contained" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
