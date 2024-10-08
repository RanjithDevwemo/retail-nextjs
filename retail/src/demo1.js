analys my code and rewrite correctly


// dbConfig.ts
import mongoose from 'mongoose';

export async function Connect(tenantId: string) {
    const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected successfully to database: ${tenantId}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
this dbConfig file and this is 

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

const UserVal = mongoose.models.user || mongoose.model('user', UserSchema);

export default UserVal;
user model page and tkonenverify page is 
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { request } from "http";

export const getDataFromToken=(request:NextRequest)=>{
    try{
        const Token_Secret='Secret_Key'
const token=request.cookies.get('token')?.value||'';
const decodedToken:any=jwt.verify(token,Token_Secret!);
return decodedToken.id;
    }catch(error){
        console.log(error);
        
    }
}

and this is middleware 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
const path=request.nextUrl.pathname

const isPublicPath=path=='/login' || path=='/signup'

const token=request.cookies.get('token')?.value||''

if(isPublicPath && token){
  return NextResponse.redirect(new URL('/',request.nextUrl))
}
if(!isPublicPath && !token){
  return NextResponse.redirect(new URL('/login',request.nextUrl))
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/Components/AddProduct',
    '/Components/AllProducts',
    '/Components/WareHouse',
    '/Components/AddVentor',
    '/Pages/AllProducts',
    '/Dashboard/Filter',
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
} and login and signup is 


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

        await Connect(tenantId); // Connect to the tenant database

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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
this is login ts file and this is

import { NextResponse } from "next/server";


export async function GET(){
    try{
const response=await NextResponse.json({
    message:"Logout Successfull",
    success:true,
})
response.cookies.set("token","",{
    httpOnly:true,expires:new Date(0)
})
return response;
    }catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }
}
logout.ts file and 

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

        await Connect(tenantId); // Connect to the tenant database

        const user = await UserVal.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserVal({
            username,
            password: hashedPassword,
            email,
            tenantId, // Store tenant ID
        });

        const saveUser = await newUser.save();
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            saveUser
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
this is signup.ts and this is 

// import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";

Connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await UserVal.findOne({ _id: userId }).select("-password");

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
menubar.ts verifyTokenExpiry and ui code is

login.tsx


// login.js
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
        tenantId: '', // Add tenantId
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            toast.success("Login successful!",response.data);
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

            <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

            <button onClick={onLogin} disabled={buttonDisabled || loading}>{loading ? "Logging in..." : "Login"}</button>
            <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
        </div>
    );
}
and signup.tsx is



// signup.js
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
        tenantId: '', // Add tenantId
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
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

            <button onClick={onSignup} disabled={buttonDisabled || loading}>{buttonDisabled ? "Signing Up..." : "Sign Up"}</button>
            <p>Already have an account? <Link href="/login">Login here</Link></p>
        </div>
    );
}
