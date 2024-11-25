import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are not empty
    if (!name || !organization || !email || !phone || !password || !role) {
      setError("All fields are required");
      return;
    }

    setLoading(true); // Show the spinner when the request starts

    try {
      const response = await fetch(
        "https://uga-cycle-backend-1.onrender.com/admin-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            organization,
            email,
            phone,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userData = data.user;
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("name", userData.name);
        localStorage.setItem("organization", userData.organization);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("phone", userData.phone);

        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide the spinner when the request completes
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid container spacing={3} direction="column" alignItems="center">
        <Typography variant="h4">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Organization"
              variant="outlined"
              fullWidth
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}{" "}
              {/* Show spinner or button text */}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default Register;
