import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import Publications from "./Pages/Publications";
import Business from "./Pages/Business";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Services from "./Pages/Services";
import Authors from "./Pages/Authors";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="register" element={<Register />} />
            <Route
              path="/publications"
              element={
                <PrivateRoute>
                  <Publications />
                </PrivateRoute>
              }
            />
            <Route
              path="/business"
              element={
                <PrivateRoute>
                  <Business />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path="/authors"
              element={
                <PrivateRoute>
                  <Authors />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthWrapper>
      </Router>
    </AuthProvider>
  );
};

const AuthWrapper = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Navbar />}
      {children}
    </>
  );
};

export default App;
