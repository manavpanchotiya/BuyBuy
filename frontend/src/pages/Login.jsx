import React, { useState } from "react";

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventdefault();
		const res = await fetch('https://localhost:3000/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ email }),
		});

		const data = await res.json();

		if (res.ok) {
			onLogin(data.user);
		} else {
			alert(data.error);
		}
	};

  return(
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
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
			<button type="submit">Login</button>
		</form>
	); 
}