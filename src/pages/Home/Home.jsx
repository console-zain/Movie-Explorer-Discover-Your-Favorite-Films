import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";

import { getTrendingMovies } from "../../services/tmdbApi";

const Home = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTrendingMovies();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>

      <h2>Welcome {username}</h2>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>

      <h2>Trending Movies</h2>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
