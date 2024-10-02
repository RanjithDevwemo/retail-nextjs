// components/RegisterForm.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      router.push("/");
    } catch (error) {
      setError(error.response.data.message || "Registration failed.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
        <Link href="/">Already have an account? Login</Link>
      </form>
    </div>
  );
}
