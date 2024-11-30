import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);
  };
  const register = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
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
