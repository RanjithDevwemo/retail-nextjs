
// // // // login.ts
// // // import { Connect } from "@/dbConfig/dbConfig";
// // // import UserVal from "@/models/UserModel";
// // // import { NextRequest, NextResponse } from "next/server";
// // // import bcryptjs from 'bcryptjs';
// // // import jwt from "jsonwebtoken";

// // // const Token_Secret = 'Secret_Key';

// // // export async function POST(request: NextRequest) {
// // //     try {
// // //         const reqBody = await request.json();
// // //         const { email, password, tenantId } = reqBody;

// // //         if (!tenantId) {
// // //             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
// // //         }

// // //         await Connect(tenantId);

// // //         const user = await UserVal.findOne({ email });

// // //         if (!user) {
// // //             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
// // //         }

// // //         const validPassword = await bcryptjs.compare(password, user.password);

// // //         if (!validPassword) {
// // //             return NextResponse.json({ error: "Invalid password" }, { status: 400 });
// // //         }

// // //         const tokenData = {
// // //             id: user._id,
// // //             username: user.username,
// // //             email: user.email,
// // //             tenantId: user.tenantId,
// // //         };

// // //         const token = await jwt.sign(tokenData, Token_Secret, { expiresIn: "1d" });

// // //         const response = NextResponse.json({
// // //             message: "Login successful",
// // //             success: true,
// // //         });

// // //         response.cookies.set("token", token, {
// // //             httpOnly: true,
// // //         });

// // //         return response;
// // //     } catch (error) {
// // //         console.error("Login error:", error);
// // //         return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
// // //     }
// // // }




// // // login.ts
// // import { Connect } from "@/dbConfig/dbConfig";
// // import UserVal from "@/models/UserModel";
// // import { NextRequest, NextResponse } from "next/server";
// // import bcryptjs from 'bcryptjs';
// // import jwt from "jsonwebtoken";

// // const Token_Secret = 'Secret_Key'; 

// // export async function POST(request: NextRequest) {
// //     try {
// //         const reqBody = await request.json();
// //         const { email, password, tenantId } = reqBody;

// //         // Validate required fields
// //         if (!tenantId) {
// //             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
// //         }
// //         if (!email || !password) {
// //             return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
// //         }

// //         // Connect to the database
// //         await Connect(tenantId);

// //         // Find user by email
// //         const user = await UserVal.findOne({ email });
// //         if (!user) {
// //             return NextResponse.json({ error: "User does not exist" }, { status: 404 });
// //         }

// //         // Validate password
// //         const validPassword = await bcryptjs.compare(password, user.password);
// //         if (!validPassword) {
// //             return NextResponse.json({ error: "Invalid password" }, { status: 401 });
// //         }

// //         // Create JWT token
// //         const tokenData = {
// //             id: user._id,
// //             username: user.username,
// //             email: user.email,
// //             tenantId: user.tenantId,
// //             role: user.role, // Include role for potential future use
// //         };

// //         const token = await jwt.sign(tokenData, Token_Secret, { expiresIn: "1d" });

// //         // Set cookie with the token
// //         const response = NextResponse.json({
// //             message: "Login successful",
// //             success: true,
// //         });

// //         response.cookies.set("token", token, {
// //             httpOnly: true,
// //             secure: process.env.NODE_ENV === 'production', // Ensure secure flag in production
// //             maxAge: 24 * 60 * 60, // 1 day
// //         });

// //         return response;
// //     } catch (error) {
// //         console.error("Login error:", error);
// //         return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
// //     }
// // }







// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";

// const TOKEN_SECRET = 'Secret_Key';

// export async function POST(request: NextRequest) {
//     try {
//         const { email, password, tenantId } = await request.json();

//         if (!tenantId) {
//             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
//         }

//         await Connect(tenantId);

//         const user = await UserVal.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//         }

//         const tokenData = { id: user._id, username: user.username, email: user.email, tenantId: user.tenantId };
//         const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

//         const response = NextResponse.json({ message: "Login successful", success: true });
//         response.cookies.set("token", token, { httpOnly: true });

//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
//     }
// }






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
