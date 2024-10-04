how use multitenant architecture using this model


import mongoose from "mongoose";
import { userInfo } from "os"


export  async function Connect(){
  const  MONGO_URI='mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/new1'
    try{
        mongoose.connect(MONGO_URI!);
        const connection=mongoose.connection;
connection.on('connected',()=>{
    console.log("MongoDB connected Successfully");
    
})
connection.on('error',(err)=>{
    console.log('mongoDb connection error. Please make sure MongoDB is running .'+err);
    process.exit();
    
})
    }catch(error){
        console.log('Something goes wrong !');
        console.log(error);
    }
}
this  is dbConfig.ts and  this is model of userInfo



import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
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

// Check if the model already exists, or create it
const UserVal = mongoose.models.user || mongoose.model('user', UserSchema);

export default UserVal;
and this is 

import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
// import { error } from "console";


Connect();

export async function POST(request:NextRequest){
    try{
      
        const reqBody=await request.json();
        const {username,email,password}=reqBody
        console.log(reqBody);

        //check user already exsit
        const user=await UserVal.findOne({email});

        if(user){
            return NextResponse.json({error:"user already exist"},{status:400});
        }

        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt)

       const newUser = new UserVal({
            username,
            password:hashedPassword,
            email
            
        })
       const saveUser= await newUser.save();
       console.log(saveUser);
       
       return NextResponse.json({
        message:'user created successfully',
        success:true,
        saveUser
       })


        
    }catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }
}
signup routeModule.ts and this is 
// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { error } from "console";
import jwt from "jsonwebtoken"
import { routeModule } from "next/dist/build/templates/app-page"

Connect();

export async function POST(request:NextRequest){
    try{

        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);
        
        //check if user is excist

        const user=await UserVal.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not existe"}
                ,{status:400}
            )
        }
//check if password is correct

const validPassword=await bcryptjs.compare
(password,user.password)

if(!validPassword){
    return NextResponse.json({error:"Invalid Password"},
        {status:400}
    )  
}
//create token value
const tokenData={
    id:user._id,
    username:user.username,
    email:user.email
}
const Token_Secret='Secret_Key'
//create token
const token =await jwt.sign(tokenData,Token_Secret!,
    {expiresIn:"1d"})

    const response = NextResponse.json({
        message:"Login successfull",
        success:true,
    })
response.cookies.set("token",token,{
    httpOnly:true,
})
return response;

    }catch(error){
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}
login routeModule.ts and this is ui code



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
login.js and this is  

'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import toast from "react-hot-toast";
// import "@/app/api/users/signup/route"
export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
          console.log(user);
          
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success:", response.data);
            toast.success("Signup successful!");
            router.push('/login');
        } catch (error) {
            console.log("Signup error:", error);
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     // setButtonDisabled(!(user.email && user.password && user.username));
    //     setButtonDisabled((user.email.length>0 && user.password.length>0 && user.username.length>0));

    // }, [user]);

    useEffect(() => {
        // setButtonDisabled(!(user.email && user.password && user.username));
       if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false);
       }else{
        setButtonDisabled(true);
       }

    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
            <hr className="mb-4" />

            <label htmlFor="username" className="mt-2">Username</label>
            <input
                type="text"
                placeholder="Username"
                value={user.username}
                name="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
            />

            <label htmlFor="email" className="mt-2">Email</label>
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
            />

            <label htmlFor="password" className="mt-2">Password</label>
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
            />

            <button
                onClick={onSignup}
                disabled={buttonDisabled || loading}
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
                {buttonDisabled ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="mt-4">
                Already have an account? <Link href="/login" className="text-blue-500">Login here</Link>
            </p>
        </div>
    );
}
signup.js rewrite all and creting multi tenant architecture
