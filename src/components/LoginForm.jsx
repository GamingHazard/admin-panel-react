import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserProvider";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

        setUser(userData);

        navigate("/dashboard");
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fbfbda",
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        {error && <Typography color="error">{error}</Typography>}
        <form
          style={{
            backgroundColor: "#3b6d3b",
            padding: 30,
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" color="#fbfbda">
            Login
          </Typography>
          <Grid item>
            <TextField
              style={{
                backgroundColor: "#fbfbda",
                marginTop: 16,
                color: "#3b6d3b",

                borderRadius: 10,
              }}
              label="Email or Phone"
              variant="outlined"
              la
              fullWidth
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </form>
        <Grid item>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Register here
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
