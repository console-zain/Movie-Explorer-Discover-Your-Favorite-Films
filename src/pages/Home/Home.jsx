import { useEffect, useState } from "react";

import { Button, Typography, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";

import { useMovieContext } from "../../context/MovieContext";

import { getTrendingMovies } from "../../services/tmdbApi";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = () => {
  const { trendingMovies, setTrendingMovies } = useMovieContext();

  const theme = useTheme();

  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTrendingMovies(1);

        setTrendingMovies(data.results || []);

        setHasMore(data.page < data.total_pages);
      } catch (err) {
        console.error(err);

        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [setTrendingMovies]);

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;

      const data = await getTrendingMovies(nextPage);

      const updatedMovies = [
        ...(trendingMovies || []),
        ...(data.results || []),
      ];

      setTrendingMovies(updatedMovies);

      setPage(nextPage);

      setHasMore(nextPage < data.total_pages);
    } catch (err) {
      console.error(err);

      setError("Failed to load more movies.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <ErrorMessage message={error} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",

          background: theme.palette.background.default,

          color: theme.palette.text.primary,

          pt: 14,

          pb: 6,
        }}
      >
        <Box
          sx={{
            maxWidth: "1700px",

            mx: "auto",

            px: 4,
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
              Welcome back,
              <span
                style={{
                  color: "#E50914",
                }}
              >
                {" "}
                {username}
              </span>
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,

                fontSize: "1.1rem",
              }}
            >
              Discover trending movies, explore new releases, and build your
              personal collection.
            </Typography>
          </Paper>

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Trending Today
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {trendingMovies.length} movies
            </Typography>
          </Box>

          {trendingMovies.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 6,

                textAlign: "center",

                background: theme.palette.background.paper,

                border: `1px solid ${theme.palette.divider}`,

                borderRadius: 4,
              }}
            >
              <Typography variant="h5">No movies available</Typography>

              <Typography
                sx={{
                  color: theme.palette.text.secondary,

                  mt: 1,
                }}
              >
                Please try again later or check your internet connection.
              </Typography>
            </Paper>
          )}

          {trendingMovies.length > 0 && (
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",

                gap: 3,
              }}
            >
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Box>
          )}

          {hasMore && trendingMovies.length > 0 && (
            <Box
              sx={{
                display: "flex",

                justifyContent: "center",

                mt: 5,
              }}
            >
              <Button
                variant="contained"
                onClick={handleLoadMore}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
