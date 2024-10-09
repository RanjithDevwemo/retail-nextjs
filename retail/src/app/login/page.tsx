

// // // 'use client';
// // // import Link from "next/link";
// // // import { useRouter } from "next/navigation";
// // // import axios from "axios";
// // // import { useEffect, useState } from "react";

// // // export default function LoginPage() {
// // //   const router = useRouter();
// // //   const [buttonDisabled, setButtonDisabled] = useState(true);
// // //   const [loading, setLoading] = useState(false);

// // //   const [user, setUser] = useState({
// // //     email: '',
// // //     password: '',
// // //   });

// // //   const onLogin = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.post('/api/users/login', user);
// // //       console.log("Login Success:", response.data);
// // //       router.push('/Dashboard/Filter'); 
// // //       window.location.reload();
// // //     } catch (error) {
// // //       console.log("Login Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user.email.length > 0 && user.password.length > 0) {
// // //       setButtonDisabled(false);
// // //     } else {
// // //       setButtonDisabled(true);
// // //     }
// // //   }, [user]);

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen py-2">
// // //       <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
// // //       <hr className="mb-4" />

// // //       <label htmlFor="email" className="mt-2">Email</label>
// // //       <input
// // //         type="email"
// // //         placeholder="Email"
// // //         value={user.email}
// // //         name="email"
// // //         onChange={(e) => setUser({ ...user, email: e.target.value })}
// // //         className="border border-gray-300 rounded-md px-4 py-2 mb-4"
// // //       />

// // //       <label htmlFor="password" className="mt-2">Password</label>
// // //       <input
// // //         type="password"
// // //         placeholder="Password"
// // //         value={user.password}
// // //         name="password"
// // //         onChange={(e) => setUser({ ...user, password: e.target.value })}
// // //         className="border border-gray-300 rounded-md px-4 py-2 mb-4"
// // //       />

// // //       <button
// // //         onClick={onLogin}
// // //         disabled={buttonDisabled || loading}
// // //         className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
// // //       >
// // //         {loading ? "Logging in..." : "Login"}
// // //       </button>

// // //       <p className="mt-4">
// // //         Don't have an account? <Link href="/signup" className="text-blue-500">Sign up here</Link>
// // //       </p>
// // //     </div>
// // //   );
// // // }











// // // login.js
// // 'use client';
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import toast from "react-hot-toast";

// // export default function LoginPage() {
// //     const router = useRouter();
// //     const [user, setUser] = useState({
// //         email: '',
// //         password: '',
// //         tenantId: '', // Add tenantId
// //     });

// //     const [buttonDisabled, setButtonDisabled] = useState(true);
// //     const [loading, setLoading] = useState(false);

// //     const onLogin = async () => {
// //         try {
// //             setLoading(true);
// //             const response = await axios.post('/api/users/login', user);
// //             toast.success("Login successful!",response.data);
// //             router.push('/Dashboard/Filter');
// //         } catch (error) {
// //             toast.error("Login failed");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         setButtonDisabled(!(user.email && user.password && user.tenantId));
// //     }, [user]);

// //     return (
// //         <div className="flex flex-col items-center justify-center min-h-screen py-2">
// //             <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
// //             <hr className="mb-4" />

// //             <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
// //             <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
// //             <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

// //             <button onClick={onLogin} disabled={buttonDisabled || loading}>{loading ? "Logging in..." : "Login"}</button>
// //             <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
// //         </div>
// //     );
// // }






// // LoginPage.tsx
// 'use client';
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function LoginPage() {
//     const router = useRouter();
//     const [user, setUser] = useState({
//         email: '',
//         password: '',
//         tenantId: '',
//     });

//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const onLogin = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post('/api/users/login', user);
//             toast.success("Login successful!");
//             router.push('/Dashboard/Filter');
//         } catch (error) {
//             toast.error("Login failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setButtonDisabled(!(user.email && user.password && user.tenantId));
//     }, [user]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
//             <hr className="mb-4" />

//             <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//             <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//             <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

//             <button onClick={onLogin} disabled={buttonDisabled || loading}>{loading ? "Logging in..." : "Login"}</button>
//             <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
//         </div>
//     );
// }





'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        tenantId: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            // First, attempt to log in the user
            const response = await axios.post('/api/users/login', user);

            // Then, pass the tenant ID to the backend
            await axios.post('http://localhost:4000/passTenantId', { tenantId: user.tenantId });

            toast.success("Login successful!");
            router.push('/Dashboard/Filter');
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.tenantId));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
            <hr className="mb-4" />

            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
                type="text"
                placeholder="Tenant ID"
                value={user.tenantId}
                onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
            />

            <button onClick={onLogin} disabled={buttonDisabled || loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
        </div>
    );
}
