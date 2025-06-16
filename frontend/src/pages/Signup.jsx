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

export default function Signup({ onSignup }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: password,
            first_name: fname,
            last_name: lname,
            location,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onSignup(data.user);
        navigate("/products");
      } else {
        setErrorMsg(data.error || "Signup failed");
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
        Sign Up
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <TextField
          label="First Name"
          type="text"
          required
          fullWidth
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />

        <TextField
          label="Last Name"
          type="text"
          required
          fullWidth
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />

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

        <TextField
          label="City"
          type="text"
          required
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
