import React, { createContext, useState, useEffect } from "react";

// Create a Context for the User
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage when the app starts
    const storedUser = {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      name: localStorage.getItem("name"),
      organization: localStorage.getItem("organization"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
    };

    // If user info exists in localStorage, set it to the context state
    if (storedUser.token) {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    // Clear user info from localStorage and set user to null
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("organization");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
