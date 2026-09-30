import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card
      sx={{
        width: 220,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="350"
        image={imageUrl}
        alt={movie.title}
      />

      <CardContent>
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
