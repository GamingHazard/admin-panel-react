import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
} from "@mui/material";
import {
  Mail as MailIcon,
  CheckCircleOutline as ApprovedIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onContentChange }) => {
  const [activeButton, setActiveButton] = useState("Inbox"); // Default to Inbox
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    onContentChange(buttonName); // Notify parent about content change
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all user data
    navigate("/"); // Redirect to login page
  };

  // Define icons for each button
  const menuItems = [
    { name: "Inbox", icon: <MailIcon /> },
    { name: "Approved", icon: <ApprovedIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "fixed", width: "250px" }}>
        <Typography variant="h6" gutterBottom>
          Dashboard
        </Typography>
        <List>
          {menuItems.map(({ name, icon }) => (
            <ListItem
              button
              key={name}
              onClick={() => handleButtonClick(name)}
              sx={{
                backgroundColor:
                  activeButton === name ? "#1976d2" : "whitesmoke",
                color: activeButton === name ? "#fff" : "#000",
                borderRadius: "4px",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor:
                    activeButton === name ? "#1976d2" : "#e0e0e0",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeButton === name ? "#fff" : "#000",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
          <Button
            color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              marginTop: "16px",
            }}
          >
            Logout
          </Button>
        </List>
      </div>
    </Box>
  );
};

export default Sidebar;
