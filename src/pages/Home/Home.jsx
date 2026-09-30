import { useEffect, useState } from "react";

import { Button, Typography, Box, Paper } from "@mui/material";

import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";

import { useMovieContext } from "../../context/MovieContext";

import { getTrendingMovies } from "../../services/tmdbApi";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = () => {
  const { trendingMovies, setTrendingMovies } = useMovieContext();

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
          background: "linear-gradient(to bottom, #141414, #0f0f0f)",
          color: "#FFFFFF",
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
                color: "#B3B3B3",
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
                color: "#B3B3B3",
              }}
            >
              {trendingMovies.length} movies
            </Typography>
          </Box>

          {trendingMovies.length === 0 && (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",

                background: "rgba(31,31,31,0.6)",

                borderRadius: 4,
              }}
            >
              <Typography variant="h5">No movies available</Typography>

              <Typography
                sx={{
                  color: "#B3B3B3",
                  mt: 1,
                }}
              >
                Please try again later.
              </Typography>
            </Paper>
          )}

          {trendingMovies.length > 0 && (
            <Box
              sx={{
                maxWidth: "1600px",

                mx: "auto",

                display: "grid",

                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 230px))",

                justifyContent: "center",

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

                mt: 6,
              }}
            >
              <Button
                onClick={handleLoadMore}
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,

                  borderRadius: "999px",

                  background: "#E50914",

                  fontWeight: 700,

                  "&:hover": {
                    background: "#B20710",
                  },
                }}
              >
                Load More Movies
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
