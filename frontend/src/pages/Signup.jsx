import React, { useState } from "react";

export default function Signup({ onSignup }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventdefault();
        const res = await fetch('https://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            onSignup(data.user);
        } else {
            alert(data.error);
        }
    };

  return(
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
            type="name"
            placeholder="enter your first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            />
            <input
            type="name"
            placeholder="enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            />
            <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <input
            type="text"
            placeholder="enter your city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            />
            <button type="submit">Sign up</button>
        </form>
    ); 
}