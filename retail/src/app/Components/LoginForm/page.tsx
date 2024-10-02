// components/LoginForm.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Invalid Credentials");
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <Link href="/register">Don't have an account? Register</Link>
      </form>
    </div>
  );
}
