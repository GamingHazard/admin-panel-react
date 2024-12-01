import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios"; // Directly use axios if you don't need a custom instance

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are not empty
    if (!name || !organization || !email || !phone || !password || !role) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

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
            role,
            password,
          }), // Updated the body to send the necessary data
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userData = data.user;

        // Replace localStorage with sessionStorage
        sessionStorage.setItem("userId", userData.id);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", userData.role);
        sessionStorage.setItem("name", userData.name);
        sessionStorage.setItem("organization", userData.organization);
        sessionStorage.setItem("email", userData.email);
        sessionStorage.setItem("phone", userData.phone);

        register(data.token);
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            margin: 8,
            backgroundColor: "#f50057",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Admin Account
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ width: "100%", marginTop: 8 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Names"
            label="Names"
            name="Names"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormControl
            fullWidth
            style={{
              backgroundColor: "#fbfbda",
              marginTop: 16,

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
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email@gmail.com"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Tel-Number (+256)"
            name="phone"
            autoComplete="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "24px 0 16px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          <Grid container>
            <Typography style={{ textAlign: "center" }} variant="body2">
              Don't have an account?{" "}
              <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
                Register here
              </Link>
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
