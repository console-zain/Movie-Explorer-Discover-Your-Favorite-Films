import { Typography, Box, Paper } from "@mui/material";

import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";

import { useMovieContext } from "../../context/MovieContext";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #141414, #0f0f0f)",
          color: "#FFFFFF",
          px: 4,
          pt: 14,
          pb: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            mb: 6,

            borderRadius: 6,

            backdropFilter: "blur(20px)",

            background: "rgba(31,31,31,0.6)",

            border: "1px solid rgba(255,255,255,0.08)",

            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Your Collection
          </Typography>

          <Typography
            sx={{
              color: "#B3B3B3",
              fontSize: "1.1rem",
            }}
          >
            Movies you've saved for later.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#E50914",
              fontWeight: 600,
            }}
          >
            {favorites.length} Movies Saved
          </Typography>
        </Paper>

        {favorites.length === 0 ? (
          <Paper
            sx={{
              p: 8,
              textAlign: "center",

              background: "rgba(31,31,31,0.6)",

              borderRadius: 6,

              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Your collection is empty
            </Typography>

            <Typography
              sx={{
                color: "#B3B3B3",
              }}
            >
              Add movies using the heart icon from Home or Search.
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",

              gap: 3,
            }}
          >
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Favorites;
