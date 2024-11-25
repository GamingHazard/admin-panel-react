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

  const name = localStorage.getItem("organization");
  const formattedName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#3b6d3b",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "fixed", width: "250px" }}>
        <Typography
          variant="h6"
          color="#fbfbda"
          textAlign="center"
          gutterBottom
          fontWeight="bold"
          fontSize={26}
        >
          {formattedName}
        </Typography>
        <Typography
          variant="h6"
          color="#fbfbda"
          textAlign="center"
          fontWeight="bold"
        >
          Admin
        </Typography>
        <Typography
          variant="h6"
          color="#fbfbda"
          textAlign="center"
          gutterBottom
          fontWeight="bold"
        >
          Dashboard
        </Typography>
        <List>
          {menuItems.map(({ name, icon }) => (
            <ListItem
              button
              key={name}
              onClick={() => handleButtonClick(name)}
              sx={{
                backgroundColor: activeButton === name ? "#fbfbda" : "#3b6d3b",
                color: activeButton === name ? "#3b6d3b" : "#fbfbda",
                borderRadius: "4px",
                marginBottom: "8px",
                cursor: "pointer",
                ":hover": { backgroundColor: "#fbfbda", color: "#3b6d3b" },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeButton === name ? "#3b6d3b" : "#fbfbda",
                  ":hover": { color: "#3b6d3b" },
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              marginTop: "16px",
              color: "#fbfbda",
              fontWeight: "bold",
              width: "100%",
              top: 270,
              ":hover": { backgroundColor: "#fbfbda", color: "#3b6d3b" },
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
