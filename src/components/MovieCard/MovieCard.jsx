import { useState } from "react";

import { Card, CardMedia, Typography, IconButton, Box } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";

import {
  getFavorites,
  saveFavorites,
  isFavorite,
} from "../../utils/localStorage";

import { useMovieContext } from "../../context/MovieContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const { setFavorites } = useMovieContext();

  const [favorite, setFavorite] = useState(isFavorite(movie.id));

  const handleFavorite = (e) => {
    e.stopPropagation();

    let currentFavorites = getFavorites();

    let updatedList = [];

    if (favorite) {
      updatedList = currentFavorites.filter((fav) => fav.id !== movie.id);

      setFavorite(false);
    } else {
      updatedList = [...currentFavorites, movie];

      setFavorite(true);
    }

    saveFavorites(updatedList);
    setFavorites(updatedList);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        position: "relative",

        overflow: "hidden",

        borderRadius: "18px",

        background: "#1F1F1F",

        cursor: "pointer",

        transition: "all 0.3s ease",

        border: "1px solid rgba(255,255,255,0.05)",

        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",

          boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
        },

        "&:hover .movie-overlay": {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={movie.title}
        sx={{
          height: 380,
          objectFit: "cover",
        }}
      />

      <Box
        className="movie-overlay"
        sx={{
          position: "absolute",

          inset: 0,

          opacity: 0,

          transition: "opacity 0.3s ease",

          background: `
            linear-gradient(
              to top,
              rgba(0,0,0,0.95) 0%,
              rgba(0,0,0,0.7) 35%,
              rgba(0,0,0,0.15) 70%,
              transparent 100%
            )
          `,

          display: "flex",

          flexDirection: "column",

          justifyContent: "flex-end",

          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",

            fontWeight: 700,

            overflow: "hidden",

            textOverflow: "ellipsis",

            whiteSpace: "nowrap",
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          sx={{
            color: "#B3B3B3",

            mt: 1,

            fontSize: "0.9rem",
          }}
        >
          ⭐ {movie.vote_average?.toFixed(1)}
          {" • "}
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </Typography>
      </Box>

      <IconButton
        onClick={handleFavorite}
        sx={{
          position: "absolute",

          right: 12,

          bottom: 12,

          zIndex: 20,

          backdropFilter: "blur(16px)",

          background: "rgba(0,0,0,0.45)",

          border: "1px solid rgba(255,255,255,0.1)",

          "&:hover": {
            background: "rgba(0,0,0,0.65)",
          },
        }}
      >
        {favorite ? (
          <FavoriteIcon
            sx={{
              color: "#E50914",
            }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{
              color: "#FFFFFF",
            }}
          />
        )}
      </IconButton>
    </Card>
  );
};

export default MovieCard;
