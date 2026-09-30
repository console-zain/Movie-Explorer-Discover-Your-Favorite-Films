import { Typography, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";

import { useMovieContext } from "../../context/MovieContext";

const Favorites = () => {
  const { favorites } = useMovieContext();

  const theme = useTheme();

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",

          background: theme.palette.background.default,

          color: theme.palette.text.primary,

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

            background: theme.palette.background.paper,

            border: `1px solid ${theme.palette.divider}`,

            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
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
              color: theme.palette.text.secondary,

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
            elevation={0}
            sx={{
              p: 8,

              textAlign: "center",

              borderRadius: 6,

              background: theme.palette.background.paper,

              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Your collection is empty
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
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
