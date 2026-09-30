import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
