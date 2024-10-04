
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