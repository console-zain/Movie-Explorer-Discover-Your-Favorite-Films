import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
import { useMovieContext } from "../../context/MovieContext";
import { getTrendingMovies } from "../../services/tmdbApi";

const Home = () => {
  const { trendingMovies, setTrendingMovies } = useMovieContext();

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
    };

    fetchMovies();
  }, []);

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
