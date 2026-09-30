import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getFavorites, saveFavorites } from "../../utils/localStorage";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();

    const favorites = getFavorites();

    const exists = favorites.some((fav) => fav.id === movie.id);

    if (!exists) {
      favorites.push(movie);
      saveFavorites(favorites);

      alert("Added to favorites");
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
          <FavoriteIcon />
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
