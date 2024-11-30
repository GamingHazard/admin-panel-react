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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios"; // Directly use axios if you don't need a custom instance

const LandingPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://uga-cycle-backend-1.onrender.com/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier, password }),
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

        login(data.token);
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
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
          Admin Sign In
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
            id="email"
            label="Email / Tel-Number"
            name="email"
            autoComplete="email"
            autoFocus
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
              <Link
                to="/register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Register here
              </Link>
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LandingPage;
