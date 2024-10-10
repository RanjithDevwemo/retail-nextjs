why this error accuire
Token verification failed: [Error: The edge runtime does not support Node.js 'crypto' module.
    Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
    Token verification failed: [Error: The edge runtime does not support Node.js 'crypto' module.
    Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
    Token verification failed: [Error: The edge runtime does not support Node.js 'crypto' module.
    Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
    Token verification failed: [Error: The edge runtime does not support Node.js 'crypto' module.
    Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
    Token verification failed: [Error: The edge runtime does not support Node.js 'crypto' module.
    Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
    
    analist my codes 

    middleware.ts is 
    
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key';

    // Decode the token to get user role
    let userRole = '';
    if (token) {
        try {
            const decoded = jwt.verify(token, TOKEN_SECRET);
            userRole = decoded.role; // Assuming the role is part of the token data
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }

    // Define public paths
    const isPublicPath = ['/login', '/signup'].includes(path);

    // Redirect if a logged-in user tries to access public routes
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protected routes requiring authentication
    const protectedPaths = [
        '/Components/AddProduct',
        '/Components/AllProducts',
        '/Components/WareHouse',
        '/Components/AddVendor',
        '/Pages/AllProducts',
        '/Dashboard/Filter',
        '/profile',
    ];

    // Redirect to login if trying to access protected routes without a token
    if (protectedPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin-specific access control
    const adminPaths = [
        '/Components/AddVendor',
        '/Components/AddProduct',
        '/Dashboard/Filter',
    ];

    // Redirect if a non-admin tries to access admin routes
    if (adminPaths.includes(path) && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // You can add user-specific access control here if needed
}

// Middleware config
export const config = {
    matcher: [
        '/Components/AddProduct',
        '/Components/AllProducts',
        '/Components/WareHouse',
        '/Components/AddVendor',
        '/Pages/AllProducts',
        '/Dashboard/Filter',
        '/profile',
        '/login',
        '/signup',
        '/unauthorized', // Page to show unauthorized access
    ],
};
and login.ts is 

import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key'; // Use environment variable

export async function POST(request: NextRequest) {
    try {
        const { email, password, tenantId } = await request.json();

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
        }

        await Connect(tenantId);

        const user = await UserVal.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = { 
            id: user._id, 
            username: user.username, 
            email: user.email, 
            tenantId: user.tenantId,
            role: user.role // Include role in the token
        };
        const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "Login successful", success: true });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
    }
}
and signup.ts is  

// signup.ts
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, tenantId, role } = reqBody;

        // Validate required fields
        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
        }
        if (!username || !email || !password || !role) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Connect to the database
        await Connect(tenantId);

        // Check if user already exists
        const userExists = await UserVal.findOne({ email });
        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new UserVal({
            username,
            password: hashedPassword,
            email,
            tenantId,
            role, // Store the role (e.g., user or admin)
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
and men.ts is 

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await UserVal.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User found", data: user });
    } catch (error) {
        console.error("Fetch user error:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 400 });
    }
}

and navbar.js is 

'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavBar() {
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUserRole(res.data.data.role);
            setUserName(res.data.data.username);
        } catch (error) {
            console.error(error.message);
            setUserName(null); // User not logged in
            setUserRole(''); // Reset user role if not logged in
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            setUserName(null);
            setUserRole(''); // Reset role on logout
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
                {userName ? (
                    <ul className="flex items-center justify-between gap-2">
                        {userRole === 'admin' ? (
                            <>
                                <li><Link href='/Components/AddProduct'>Add Product</Link></li>
                                <li><Link href='/Components/AllProducts'>All Products</Link></li>
                                <li><Link href='/Components/WareHouse'>Warehouse</Link></li>
                                <li><Link href='/Components/AddVendor'>Add Vendor</Link></li>
                                <li><Link href='/Dashboard/Filter'>Dashboard Home</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href='/Pages/AllProducts'>Products</Link></li>
                                <li><Link href='/Dashboard/Filter'>Dashboard Home</Link></li>
                            </>
                        )}
                    </ul>
                ) : null} {/* Only show links if user is logged in */}
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

analist all code rewrite it and add authentication and 
authorization the admin user can access all pages the user user's 
can access 
'/Components/AddProduct',
'/Components/AllProducts',
'/Components/WareHouse',
this pages only rewrite correctly