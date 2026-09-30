import { createContext, useContext, useMemo, useState } from "react";

import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "dark");

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

          primary: {
            main: "#E50914",
          },

          secondary: {
            main: "#B20710",
          },

          background: {
            default: mode === "dark" ? "#141414" : "#F5F5F5",

            paper: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
          },

          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#141414",

            secondary: mode === "dark" ? "#B3B3B3" : "#666666",
          },

          divider:
            mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        },

        typography: {
          fontFamily: "Inter, Poppins, Roboto, sans-serif",

          h1: {
            fontWeight: 800,
          },

          h2: {
            fontWeight: 800,
          },

          h3: {
            fontWeight: 700,
          },

          h4: {
            fontWeight: 700,
          },

          h5: {
            fontWeight: 600,
          },

          h6: {
            fontWeight: 600,
          },

          button: {
            textTransform: "none",
            fontWeight: 600,
          },
        },

        shape: {
          borderRadius: 20,
        },

        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 24,
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 20,
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 9999,
                fontWeight: 700,
                paddingInline: 24,
              },
            },
          },

          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 9999,
              },
            },
          },

          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: "none",
              },
            },
          },

          MuiTextField: {
            styleOverrides: {
              root: {
                width: "100%",
              },
            },
          },
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
