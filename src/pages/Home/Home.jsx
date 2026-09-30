import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
import { useMovieContext } from "../../context/MovieContext";
import { getTrendingMovies } from "../../services/tmdbApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = () => {
  const { trendingMovies, setTrendingMovies } = useMovieContext();

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const data = await getTrendingMovies();

        setTrendingMovies(data);
      } catch (err) {
        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        <h2>Welcome {username}</h2>

        <h2>Trending Movies</h2>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {trendingMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
