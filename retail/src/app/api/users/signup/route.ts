
// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
// import { NextRequest,NextResponse } from "next/server";
// import bcryptjs from 'bcryptjs';
// // import { error } from "console";


// Connect();

// export async function POST(request:NextRequest){
//     try{
      
//         const reqBody=await request.json();
//         const {username,email,password}=reqBody
//         console.log(reqBody);

//         //check user already exsit
//         const user=await UserVal.findOne({email});

//         if(user){
//             return NextResponse.json({error:"user already exist"},{status:400});
//         }

//         //hash password
//         const salt=await bcryptjs.genSalt(10);
//         const hashedPassword=await bcryptjs.hash(password,salt)

//        const newUser = new UserVal({
//             username,
//             password:hashedPassword,
//             email
            
//         })
//        const saveUser= await newUser.save();
//        console.log(saveUser);
       
//        return NextResponse.json({
//         message:'user created successfully',
//         success:true,
//         saveUser
//        })


        
//     }catch(error){
//         return NextResponse.json({error:error.message},{status:500})
//     }
// }




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
