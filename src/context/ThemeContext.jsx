import { createContext, useContext, useMemo, useState } from "react";

import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";

    setMode(newMode);

    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
