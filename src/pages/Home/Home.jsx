import { useEffect, useState } from "react";

import { Grid, Button, Typography } from "@mui/material";

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

      <div
        style={{
          padding: "20px",
          paddingTop: "90px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome {username}
        </Typography>

        <Typography variant="h4" gutterBottom>
          Trending Movies
        </Typography>

        {trendingMovies.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <Typography variant="h5">No movies available</Typography>

            <Typography color="text.secondary">
              Please try again later.
            </Typography>
          </div>
        )}

        {trendingMovies.length > 0 && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {Array.isArray(trendingMovies) &&
              trendingMovies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
          </Grid>
        )}

        {hasMore &&
          Array.isArray(trendingMovies) &&
          trendingMovies.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button variant="contained" size="large" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
