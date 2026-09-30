import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getFavorites,
  saveFavorites,
  isFavorite,
} from "../../utils/localStorage";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMovieContext } from "../../context/MovieContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // 1. Get our tools from Context (The broken lines are removed from here!)
  const { setFavorites } = useMovieContext();

  const [favorite, setFavorite] = useState(isFavorite(movie.id));

  const handleFavorite = (e) => {
    e.stopPropagation();

    let currentFavorites = getFavorites();
    let updatedList = [];

    if (favorite) {
      // If already liked, remove it from the list
      updatedList = currentFavorites.filter((fav) => fav.id !== movie.id);
      setFavorite(false);
    } else {
      // If not liked, add it to the list
      updatedList = [...currentFavorites, movie];
      setFavorite(true);
    }

    // 2. Safely run these actions inside the function where updatedList exists!
    saveFavorites(updatedList); // Saves to hard storage
    setFavorites(updatedList); // Tells our React context to update the UI
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        width: "100%",
        height: "100%",
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 320,
          objectFit: "cover",
        }}
        image={imageUrl}
        alt={movie.title}
      />

      <CardContent>
        <IconButton color="error" onClick={handleFavorite}>
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="h6">{movie.title}</Typography>

        <Typography variant="body2">
          Year:{" "}
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </Typography>

        <Typography variant="body2">
          Rating: {movie.vote_average?.toFixed(1)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
