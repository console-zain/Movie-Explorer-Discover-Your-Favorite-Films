import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "@fontsource/inter";

// 📦 We use the exact names from your context files here:
import { MovieProvider } from "./context/MovieContext";
import { ThemeProviderCustom } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderCustom>
        <MovieProvider>
          <App />
        </MovieProvider>
      </ThemeProviderCustom>
    </BrowserRouter>
  </React.StrictMode>,
);
