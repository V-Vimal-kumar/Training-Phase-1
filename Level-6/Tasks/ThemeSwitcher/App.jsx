import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeSwitcher";

const ThemedPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{
      backgroundColor: theme === "light" ? "white" : "black",
      color: theme === "light" ? "black" : "white",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <h1>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemedPage />
    </ThemeProvider>
  );
};

export default App;
