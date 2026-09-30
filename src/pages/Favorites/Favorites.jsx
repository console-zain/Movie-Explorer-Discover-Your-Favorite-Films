import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieCard/MovieCard";

import { getFavorites } from "../../utils/localStorage";

import { Typography, Grid } from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      setFavorites(getFavorites());
    };

    loadFavorites();

    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
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
  );
};

export default Favorites;
