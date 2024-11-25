import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Inbox, CheckCircle, Settings } from "@mui/icons-material";
import { Route, Routes, useNavigate } from "react-router-dom";
import InboxPage from "./Inbox";
import ApprovedPage from "./Approved";
import SettingsPage from "./Settings";

const menuItems = [
  { text: "Inbox", icon: <Inbox />, path: "/dashboard/inbox" },
  { text: "Approved", icon: <CheckCircle />, path: "/dashboard/approved" },
  { text: "Settings", icon: <Settings />, path: "/dashboard/settings" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
          Admin Panel
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="inbox" element={<InboxPage />} />
          <Route path="approved" element={<ApprovedPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
