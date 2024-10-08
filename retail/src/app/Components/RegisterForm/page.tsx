// // components/RegisterForm.js
// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from 'axios';

// export default function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are necessary.");
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
//       router.push("/");
//     } catch (error) {
//       setError(error.response.data.message || "Registration failed.");
//     }
//   };

//   return (
//     <div className="grid place-items-center h-screen">
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
//         <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Register</button>
//         {error && <p>{error}</p>}
//         <Link href="/">Already have an account? Login</Link>
//       </form>
//     </div>
//   );
// }





// signup.tsx
'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
        tenantId: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/signup", user);
            toast.success("Signup successful!");
            router.push('/login');
        } catch (error) {
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
            <hr className="mb-4" />

            <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

            <button onClick={onSignup} disabled={buttonDisabled || loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
            <p>Already have an account? <Link href="/login">Login here</Link></p>
        </div>
    );
}
