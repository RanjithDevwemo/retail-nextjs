
// // 'use client';
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import axios from "axios";
// // import React,{ useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // // import "@/app/api/users/signup/route"
// // export default function SignUpPage() {
// //     const router = useRouter();
// //     const [user, setUser] = useState({
// //         email: '',
// //         password: '',
// //         username: '',
// //     });

// //     const [buttonDisabled, setButtonDisabled] = useState(true);
// //     const [loading, setLoading] = useState(false);

// //     const onSignup = async () => {
// //         try {
// //           console.log(user);
          
// //             setLoading(true);
// //             const response = await axios.post("/api/users/signup", user);
// //             console.log("Signup Success:", response.data);
// //             toast.success("Signup successful!");
// //             router.push('/login');
// //         } catch (error) {
// //             console.log("Signup error:", error);
// //             toast.error("Signup failed");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // useEffect(() => {
// //     //     // setButtonDisabled(!(user.email && user.password && user.username));
// //     //     setButtonDisabled((user.email.length>0 && user.password.length>0 && user.username.length>0));

// //     // }, [user]);

// //     useEffect(() => {
// //         // setButtonDisabled(!(user.email && user.password && user.username));
// //        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
// //         setButtonDisabled(false);
// //        }else{
// //         setButtonDisabled(true);
// //        }

// //     }, [user]);

// //     return (
// //         <div className="flex flex-col items-center justify-center min-h-screen py-2">
// //             <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
// //             <hr className="mb-4" />

// //             <label htmlFor="username" className="mt-2">Username</label>
// //             <input
// //                 type="text"
// //                 placeholder="Username"
// //                 value={user.username}
// //                 name="username"
// //                 onChange={(e) => setUser({ ...user, username: e.target.value })}
// //                 className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
// //             />

// //             <label htmlFor="email" className="mt-2">Email</label>
// //             <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={user.email}
// //                 name="email"
// //                 onChange={(e) => setUser({ ...user, email: e.target.value })}
// //                 className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
// //             />

// //             <label htmlFor="password" className="mt-2">Password</label>
// //             <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={user.password}
// //                 name="password"
// //                 onChange={(e) => setUser({ ...user, password: e.target.value })}
// //                 className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
// //             />

// //             <button
// //                 onClick={onSignup}
// //                 disabled={buttonDisabled || loading}
// //                 className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
// //             >
// //                 {buttonDisabled ? "Signing Up..." : "Sign Up"}
// //             </button>

// //             <p className="mt-4">
// //                 Already have an account? <Link href="/login" className="text-blue-500">Login here</Link>
// //             </p>
// //         </div>
// //     );
// // }




// // signup.js
// 'use client';
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function SignUpPage() {
//     const router = useRouter();
//     const [user, setUser] = useState({
//         email: '',
//         password: '',
//         username: '',
//         tenantId: '', // Add tenantId
//     });

//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const onSignup = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/signup", user);
//             toast.success("Signup successful!");
//             router.push('/login');
//         } catch (error) {
//             toast.error("Signup failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
//     }, [user]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
//             <hr className="mb-4" />

//             <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
//             <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//             <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//             <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

//             <button onClick={onSignup} disabled={buttonDisabled || loading}>{buttonDisabled ? "Signing Up..." : "Sign Up"}</button>
//             <p>Already have an account? <Link href="/login">Login here</Link></p>
//         </div>
//     );
// }



// SignUpPage.tsx
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
