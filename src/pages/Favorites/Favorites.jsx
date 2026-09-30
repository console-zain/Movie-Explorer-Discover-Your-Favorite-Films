import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getFavorites } from "../../utils/localStorage";
import { Typography, Grid } from "@mui/material";
import { useMovieContext } from "../../context/MovieContext";

import Navbar from "../../components/Navbar/Navbar";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <>
      {}
      <Navbar />

      <div
        style={{
          padding: "20px",
          paddingTop: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Favorites
        </Typography>

        {favorites.length === 0 && (
          <Typography>No favorite movies yet.</Typography>
        )}

        {favorites.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              No favorite movies yet
            </Typography>

            <Typography color="text.secondary">
              Add movies from Home or Search to see them here.
            </Typography>
          </div>
        )}

        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Favorites;
