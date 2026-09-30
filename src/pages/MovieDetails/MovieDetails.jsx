import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Details</h1>
      <h2>Movie ID: {id}</h2>
    </div>
  );
};

export default MovieDetails;
