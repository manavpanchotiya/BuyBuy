import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignup }) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        }
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save token from backend response to localStorage
      localStorage.setItem('token', data.token);

      // Pass user info up to parent component if needed
      onSignup(data.user);

      // Redirect user to products page after signup
      navigate("/products");
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter your first name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter your last name"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter your city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Sign up</button>
    </form>
  );
}
