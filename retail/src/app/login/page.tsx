

'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login Success:", response.data);
      router.push('/Dashboard/Filter'); 
      window.location.reload();
    } catch (error) {
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
      <hr className="mb-4" />

      <label htmlFor="email" className="mt-2">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        name="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <label htmlFor="password" className="mt-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        name="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4">
        Don't have an account? <Link href="/signup" className="text-blue-500">Sign up here</Link>
      </p>
    </div>
  );
}
