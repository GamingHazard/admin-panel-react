import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Approved from "./Approved";

const Dashboard = () => {
  const [content, setContent] = useState("Inbox"); // Default content to Inbox

  const renderContent = () => {
    switch (content) {
      case "Inbox":
        return (
          <div
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              flex: 1,
              height: 650,
            }}
          >
            <Inbox />
          </div>
        );
      case "Approved":
        return (
          <div
            style={{
              backgroundColor: "whitesmoke",
              padding: 10,
              flex: 1,
              height: 650,
            }}
          >
            <Approved />
          </div>
        );
      case "Settings":
        return <Typography variant="h4">Adjust your Settings here</Typography>;
      default:
        return <Typography variant="h4">Select a menu item</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onContentChange={setContent} />
      <Box sx={{ flex: 1, padding: "16px" }}>{renderContent()}</Box>
    </Box>
  );
};

export default Dashboard;
