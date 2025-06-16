import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        const userWithAdmin = { ...data.user, admin: data.admin };
        onLogin(userWithAdmin);

        if (data.admin) {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      } else {
        setErrorMsg(data.error || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold">
        Login
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}
