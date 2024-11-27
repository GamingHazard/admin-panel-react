import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState(""); // The organization state will store the selected value
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
        backgroundColor: "#fbfbda",
      }}
    >
      <Grid container spacing={3} direction="column" alignItems="center">
        <Typography variant="h4">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form
          style={{
            backgroundColor: "#3b6d3b",
            padding: 30,
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Grid item>
            <TextField
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          {/* Organization dropdown (Select) */}
          <Grid item>
            <FormControl
              fullWidth
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <InputLabel id="organization-label">Company</InputLabel>
              <Select
                labelId="organization-label"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                label="Company"
              >
                {/* Replace these MenuItem values with the actual organization options */}
                <MenuItem value="Asante Waste Management">
                  Asante Waste Management
                </MenuItem>
                <MenuItem value="Bins Kampala">Bins Kampala</MenuItem>
                <MenuItem value="Armstrong Global Solutions Ltd">
                  Armstrong Global Solutions Ltd
                </MenuItem>
                <MenuItem value="SWIFT Waste Masters LTD">
                  SWIFT Waste Masters LTD
                </MenuItem>
                <MenuItem value="Best of Waste"> Best of Waste</MenuItem>
                <MenuItem value="Nabugabo Updeal Joint Venture">
                  Nabugabo Updeal Joint Venture
                </MenuItem>
                <MenuItem value="De Waste (U) Ltd"> De Waste (U) Ltd</MenuItem>
                <MenuItem value="YO WASTE (U) LTD"> YO WASTE (U) LTD</MenuItem>
                <MenuItem value="Aquila Recycling Plant">
                  Aquila Recycling Plant
                </MenuItem>
                {/* Add more organizations as needed */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <TextField
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
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
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
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
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",
                borderRadius: 10,
                marginBottom: 10,
              }}
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
