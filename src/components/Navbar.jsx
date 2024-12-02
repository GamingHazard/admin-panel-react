import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import { Mail, Settings, CheckCircleOutline } from "@mui/icons-material";
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
    <AppBar
      position="static"
      style={{
        background: "#3b6d3b",
        color: "#fbfbda",
        position: "fixed",
        top: -10,
        left: -5,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="dashboard"
          component={RouterLink}
          to="/dashboard"
        >
          <DashboardIcon style={{ fontSize: 40, color: "#fbfbda" }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold" }}>
          {organization}
        </Typography>
        {isAuthenticated && (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/home"
              startIcon={<Mail style={{ color: "#fbfbda" }} />}
            >
              Inbox
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/publications"
              startIcon={<CheckCircleOutline style={{ color: "#fbfbda" }} />}
            >
              Approved
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/business"
              startIcon={<PeopleIcon style={{ color: "#fbfbda" }} />}
            >
              All Customers
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/authors"
              startIcon={<Settings style={{ color: "#fbfbda" }} />}
            >
              Settings
            </Button>

            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon style={{ color: "#fbfbda" }} />
              Logout
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
