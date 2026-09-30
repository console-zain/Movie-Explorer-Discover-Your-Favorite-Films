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

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(isFavorite(movie.id));

  const handleFavorite = (e) => {
    e.stopPropagation();

    let favorites = getFavorites();

    if (favorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);

      saveFavorites(favorites);
      setFavorite(false);
    } else {
      favorites.push(movie);

      saveFavorites(favorites);
      setFavorite(true);
    }
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
