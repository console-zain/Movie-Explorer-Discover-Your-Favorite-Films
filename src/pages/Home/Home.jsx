import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>

      <h2>Welcome {username}</h2>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
