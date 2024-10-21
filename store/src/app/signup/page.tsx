


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import toast from "react-hot-toast";

// export default function SignupPage() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: "",
//     username: "",
//     password: "",
//     tenantId: "",
//     role:'user'
//   });

//   const [buttonDisabled, setButtonDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const onSignup = async () => {
//     try {
//       setLoading(true);
//       console.log(user);
      
//       const response = await axios.post('/api/users/signup', user);
//       console.log("SignUp Response", response.data);
//       router.push('/login');
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>{loading ? "Processing" : "Sign Up"} Store</h1>
//       <hr />
//       <label htmlFor="username">Username</label>
//       <input
//         className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="username"
//         type="text"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder="Username"
//       />

//       <label htmlFor="email">Email</label>
//       <input
//         className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="email"
//         type="email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="Email"
//       />

//       <label htmlFor="password">Password</label>
//       <input
//         className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="password"
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="Password"
//       />

//       <label htmlFor="tenantId">Tenant ID</label>
//       <input
//         className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="tenantId"
//         type="text"
//         value={user.tenantId}
//         onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
//         placeholder="Tenant ID"
//       />
//       <select className="text-black" name="role" onChange={(e)=>setUser({...user,role:e.target.value})} value={user.role} aria-label="val"  id="">
//     <option className="text-black" value="user">User</option>
//     <option className="text-black" value="admin">Admin</option>
// </select>
//       <button
//         onClick={onSignup}
//         className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg"
//         disabled={buttonDisabled || loading}
//       >
//         {loading ? "Processing..." : "Sign Up"}
//       </button>
      
//       <Link href="/login">Visit Login</Link>
//     </div>
//   );
// }








"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        tenantId: "",
        role: 'user'
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("SignUp Response", response.data);

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
              alert("signup success");
                router.push('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Sign Up"} Store</h1>
            <hr className="w-full mb-4" />

            <label htmlFor="username" className="mb-1">Username</label>
            <input
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />

            <label htmlFor="email" className="mb-1">Email</label>
            <input
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="password" className="mb-1">Password</label>
            <div className="relative mb-4 w-80">
                <input
                    className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black w-full"
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    {passwordVisible ? <FaRegEye /> : <FaEyeSlash />}
                </button>
            </div>

            <label htmlFor="tenantId" className="mb-1">Tenant ID</label>
            <input
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                id="tenantId"
                type="text"
                value={user.tenantId}
                onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
                placeholder="Tenant ID"
            />

            <select
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                name="role"
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                value={user.role}
                id="role"
            >
                <option className="text-black" value="user">User</option>
                <option className="text-black" value="admin">Admin</option>
            </select>

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg w-80 hover:bg-blue-600 transition duration-200"
                disabled={buttonDisabled || loading}
            >
                {loading ? "Processing..." : "Sign Up"}
            </button>
            
            <Link href="/login" className="text-blue-500">Visit Login</Link>
        </div>
    );
}
