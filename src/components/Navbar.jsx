import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const organization = localStorage.getItem("organization");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ background: "#f5f5f5", color: "#000" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="dashboard"
          component={RouterLink}
          to="/dashboard"
        >
          <DashboardIcon style={{ fontSize: 40, color: "#1976d2" }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {organization}
        </Typography>
        {isAuthenticated && (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/home"
              startIcon={<HomeIcon style={{ color: "#4caf50" }} />}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/publications"
              startIcon={<BookIcon style={{ color: "#ff9800" }} />}
            >
              Publications
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/business"
              startIcon={<BusinessIcon style={{ color: "#9c27b0" }} />}
            >
              Business
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/users"
              startIcon={<PeopleIcon style={{ color: "#f44336" }} />}
            >
              Users
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/services"
              startIcon={<BuildIcon style={{ color: "#00bcd4" }} />}
            >
              Services
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/authors"
              startIcon={<PersonIcon style={{ color: "#ff5722" }} />}
            >
              Authors
            </Button>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon style={{ color: "#000" }} />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
