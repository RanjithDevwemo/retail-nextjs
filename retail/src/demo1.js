analis this dbConfig 

// dbConfig.js
const mongoose = require('mongoose');

let isConnected = false; // Connection state

async function Connect(tenantId) {
    const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

    if (isConnected) {
        console.log(`Already connected to database: ${tenantId}`);
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log(`MongoDB connected successfully to database: ${tenantId}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports ={Connect};
and this is 

model.js
// UserModel.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    tenantId: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const UserVal = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserVal;


this code login.ts

// login.ts
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

const Token_Secret = 'Secret_Key';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, tenantId } = reqBody;

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
        }

        await Connect(tenantId);

        const user = await UserVal.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            tenantId: user.tenantId,
        };

        const token = await jwt.sign(tokenData, Token_Secret, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
    }
}

and this is signup.ts
// signup.ts
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, tenantId } = reqBody;

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
        }

        await Connect(tenantId);

        const userExists = await UserVal.findOne({ email });

        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserVal({
            username,
            password: hashedPassword,
            email,
            tenantId,
        });

        await newUser.save();
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "An error occurred during signup." }, { status: 500 });
    }
}

and this is me.ts 


// me.ts
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";
// import { Connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await UserVal.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        console.error("Fetch user error:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 400 });
    }
}
and this is logout.ts
// logout.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "An error occurred during logout." }, { status: 500 });
    }
}
and this is MiddlewareNotFoundError.ts

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/Components/AddProduct',
        '/Components/AllProducts',
        '/Components/WareHouse',
        '/Components/AddVendor',
        '/Pages/AllProducts',
        '/Dashboard/Filter',
        '/',
        '/profile',
        '/login',
        '/signup',
    ],
};

and this is login.js

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
            // Attempt to log in the user
            const response = await axios.post('/api/users/login', user);
            
            // Pass the tenant ID to the backend
            console.log(user.tenantId);
            
           await axios.post('http://localhost:4000/passTenantId', { tenantId: user.tenantId });


            toast.success("Login successful!");
            // router.push('/Pages/DashBoard');
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
and Signup.js



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
and this is navbar.js



// NavBar.tsx
'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavBar() {
    const [userName, setUserName] = useState(null);
    const router = useRouter();

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUserName(res.data.data.username);
        } catch (error) {
            console.error(error.message);
            setUserName(null); // User not logged in
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            setUserName(null);
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div className="flex items-center justify-around gap-2">
            <div>
                <ul className="flex items-center justify-between gap-2">
                    <li><Link href='/Components/AddProduct'>Add Product</Link></li>
                    <li><Link href='/Components/AllProducts'>All Products</Link></li>
                    <li><Link href='/Components/WareHouse'>Warehouse</Link></li>
                    <li><Link href='/Components/AddVendor'>Add Vendor</Link></li>
                    <li><Link href='/Pages/AllProducts'>Products</Link></li>
                    <li><Link href='/Dashboard/Filter'>Dashboard Home</Link></li>
                </ul>
            </div>

            {userName ? (
                <div className="flex items-center gap-4">
                    <span>{`${userName}`}</span>
                    <button onClick={logout} className="bg-blue-500 text-white p-2">Logout</button>
                </div>
            ) : (
                <Link href="/login" className="bg-blue-500 text-white p-2">Login</Link>
            )}
        </div>
    );
}
rewrite add authentication and authorization sing and login require add selecte option user or admin admin only access this page