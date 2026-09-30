import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        background: "linear-gradient(to bottom, #141414, #0f0f0f)",
      }}
    >
      <Typography
        sx={{
          color: "#E50914",
          fontSize: "3rem",
          fontWeight: 800,
          letterSpacing: "3px",
          animation: "pulse 1.5s infinite ease-in-out",
          "@keyframes pulse": {
            "0%": {
              opacity: 0.5,
              transform: "scale(0.95)",
            },
            "50%": {
              opacity: 1,
              transform: "scale(1)",
            },
            "100%": {
              opacity: 0.5,
              transform: "scale(0.95)",
            },
          },
        }}
      >
        MOVIEFLIX
      </Typography>

      <CircularProgress
        size={65}
        thickness={4}
        sx={{
          color: "#E50914",
        }}
      />

      <Typography
        sx={{
          color: "#B3B3B3",
          fontSize: "1rem",
          letterSpacing: "1px",
        }}
      >
        Loading movies...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
