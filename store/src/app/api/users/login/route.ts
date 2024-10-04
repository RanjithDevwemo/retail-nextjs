// // import { Connect } from "@/dbConfig/dbConfig";
// // import UserVal from "@/models/UserModel";
// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel"
// import { NextRequest,NextResponse } from "next/server";
// import bcryptjs from 'bcryptjs';
// import { error } from "console";
// import jwt from "jsonwebtoken"

// Connect();

// export async function POST(request:NextRequest){
//     try{

//         const reqBody=await request.json();
//         const {email,password}=reqBody;
//         console.log(reqBody);
        
//         //check if user is excist

//         const user=await UserVal.findOne({email})
//         if(!user){
//             return NextResponse.json({error:"User does not existe"}
//                 ,{status:400}
//             )
//         }
// //check if password is correct

// const validPassword=await bcryptjs.compare
// (password,user.password)

// if(!validPassword){
//     return NextResponse.json({error:"Invalid Password"},
//         {status:400}
//     )  
// }
// //create token value
// const tokenData={
//     id:user._id,
//     username:user.username,
//     email:user.email
// }
// const Token_Secret='Secret_Key'
// //create token
// const token =await jwt.sign(tokenData,Token_Secret!,
//     {expiresIn:"1d"})

//     const response = NextResponse.json({
//         message:"Login successfull",
//         success:true,
//     })
// response.cookies.set("token",token,{
//     httpOnly:true,
// })
// return response;

//     }catch(error){
//         return NextResponse.json({error:error.message},
//             {status:500}
//         )
//     }
// }







// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { error } from "console";
import jwt from "jsonwebtoken"

Connect();

export async function POST(request:NextRequest){
    try{

        const reqBody=await request.json();
        const {email,password,tenantId}=reqBody;
        console.log(reqBody);
        Connect(tenantId);
//check if tenantId is Already excist
const findTenantId=await UserVal.findOne({tenantId})
if(!findTenantId){
    return NextResponse.json({error:"TenantId  does Not Existe"},
        {status:400}
    )
}

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
    email:user.email,
    tenantId:user.tenantId,
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