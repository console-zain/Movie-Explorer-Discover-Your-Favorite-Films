import AppRoutes from "./routes/AppRoutes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useThemeContext();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </MuiThemeProvider>
  );
}

export default App;
