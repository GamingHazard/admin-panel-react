import React from 'react';
import { Container, Grid, Paper, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
    const navigate = useNavigate();

    const sections = [
        { title: 'Publications', icon: <BookIcon style={{ fontSize: 80, color: 'blue' }} />, path: '/publications' },
        { title: 'Business', icon: <BusinessIcon style={{ fontSize: 80, color: 'green' }} />, path: '/business' },
        { title: 'Home', icon: <HomeIcon style={{ fontSize: 80, color: 'purple' }} />, path: '/home' },
        { title: 'Users', icon: <PeopleIcon style={{ fontSize: 80, color: 'orange' }} />, path: '/users' },
        { title: 'Services', icon: <BuildIcon style={{ fontSize: 80, color: 'red' }} />, path: '/services' },
        { title: 'Authors', icon: <PersonIcon style={{ fontSize: 80, color: 'teal' }} />, path: '/authors' },
    ];

    return (
        <Container style={{ marginTop: '32px' }}>
            <Grid container spacing={3}>
                {sections.map((section) => (
                    <Grid item xs={12} sm={6} md={4} key={section.title}>
                        <Paper style={{ padding: '16px', textAlign: 'center' }}>
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
