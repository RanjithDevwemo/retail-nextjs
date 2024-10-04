
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { error } from "console";
// import { error } from "console";


Connect();

export async function POST(request:NextRequest){
    try{
      
        const reqBody=await request.json();
        const {username,email,password,tenantId}=reqBody
        console.log(reqBody);
Connect(tenantId);
        //check user's tenant Id already exists or not
        const findTenantId=await UserVal.findOne({tenantId});

        if(findTenantId){
            return NextResponse.json({error:"the tenantId is  Already Exists"},{status:400});
        }
        
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
            email,
            tenantId
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