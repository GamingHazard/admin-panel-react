import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if the token exists in sessionStorage to set the initial authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    sessionStorage.setItem("token", token); // Store token in sessionStorage
  };
  const register = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    sessionStorage.setItem("token", token); // Store token in sessionStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
