import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getFavorites } from "../../utils/localStorage";
import { Typography, Grid } from "@mui/material";
import { useMovieContext } from "../../context/MovieContext";

// 📦 FIXED LINE: Import the Navbar component here!
import Navbar from "../../components/Navbar/Navbar";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <>
      {/* 🧭 FIXED LINE: Put the Navbar at the very top of the page */}
      <Navbar />

      <div
        style={{
          padding: "20px",
          paddingTop: "20px", // Changed from 90px to 20px since Navbar handles the spacing now!
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Favorites
        </Typography>

        {favorites.length === 0 && (
          <Typography>No favorite movies yet.</Typography>
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
