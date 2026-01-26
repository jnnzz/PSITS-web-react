import React, { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  // Check localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("docs-dark-mode");
    if (saved !== null) {
      return saved === "true";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("docs-dark-mode", isDarkMode);

    // Add/remove dark class to html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
