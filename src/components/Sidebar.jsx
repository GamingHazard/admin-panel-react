import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
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
      <div>
        <Typography variant="h6" gutterBottom>
          Dashboard
        </Typography>
        <List>
          {["Inbox", "Profile", "Settings"].map((buttonName) => (
            <ListItem
              button
              key={buttonName}
              onClick={() => handleButtonClick(buttonName)}
              sx={{
                backgroundColor:
                  activeButton === buttonName ? "#1976d2" : "transparent",
                color: activeButton === buttonName ? "#fff" : "#000",
                borderRadius: "4px",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor:
                    activeButton === buttonName ? "#1976d2" : "#e0e0e0",
                },
              }}
            >
              <ListItemText primary={buttonName} />
            </ListItem>
          ))}
        </List>
      </div>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{
          marginTop: "16px",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
