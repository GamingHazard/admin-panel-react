import React from "react";
import { Container, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import { Mail, Settings, CheckCircleOutline, Map } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Home",
      icon: <HomeIcon style={{ fontSize: 80, color: "purple" }} />,
      path: "/home",
    },

    {
      title: "Approved",
      icon: <CheckCircleOutline style={{ fontSize: 80, color: "blue" }} />,
      path: "/publications",
    },
    {
      title: "Map",
      icon: <Map style={{ fontSize: 80, color: "teal" }} />,
      path: "/business",
    },

    {
      title: "Settings",
      icon: <Settings style={{ fontSize: 80, color: "crimson" }} />,
      path: "/authors",
    },
  ];

  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        marginTop: "200px",
      }}
    >
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Paper style={{ padding: "16px", textAlign: "center" }}>
              <IconButton onClick={() => navigate(section.path)}>
                {section.icon}
              </IconButton>
              <Typography variant="h6">{section.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
