
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;
//     const token = request.cookies.get('token')?.value || '';
//     const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key';

//     // Decode the token to get user role
//     let userRole = '';
//     if (token) {
//         try {
//             const decoded = jwt.verify(token, TOKEN_SECRET);
//             userRole = decoded.role; // Assuming the role is part of the token data
//             console.log(userRole);
            
//         } catch (error) {
//             console.error("Token verification failed:", error);
//         }
//     }

//     // Define public paths
//     const isPublicPath = ['/login', '/signup'].includes(path);

//     // Redirect if a logged-in user tries to access public routes
//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Protected routes requiring authentication
//     const protectedPaths = [
//         '/Components/AddProduct',
//         '/Components/AllProducts',
//         '/Components/WareHouse',
//         '/Components/AddVendor',
//         '/Pages/AllProducts',
//         '/Dashboard/Filter',
//         '/profile',
//     ];

//     // Redirect to login if trying to access protected routes without a token
//     if (protectedPaths.includes(path) && !token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // Admin-specific access control
//     const adminPaths = [
//         '/Components/AddVendor',
//         '/Components/AddProduct',
//         '/Dashboard/Filter',
//     ];

//     // Redirect if a non-admin tries to access admin routes
//     if (adminPaths.includes(path) && userRole !== 'admin') {
//         return NextResponse.redirect(new URL('/unauthorized', request.url));
//     }

//     // You can add user-specific access control here if needed
// }

// // Middleware config
// export const config = {
//     matcher: [
//         '/Components/AddProduct',
//         '/Components/AllProducts',
//         '/Components/WareHouse',
//         '/Components/AddVendor',
//         '/Pages/AllProducts',
//         '/Dashboard/Filter',
//         '/profile',
//         '/login',
//         '/signup',
//         '/unauthorized', // Page to show unauthorized access
//     ],
// };






// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;
//     const token = request.cookies.get('token')?.value || '';

//     // Public paths where login is not required
//     const isPublicPath = ['/login', '/signup'].includes(path);

//     // Redirect if a logged-in user tries to access public routes
//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Protected paths where authentication is required
//     const protectedPaths = [
//         '/Components/AddProduct',
//         '/Components/AllProducts',
//         '/Components/WareHouse',
//     ];

    
//     // Redirect to login if trying to access protected routes without a token
//     if (protectedPaths.includes(path) && !token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     return NextResponse.next(); // Allow the request to continue
// }

// // Middleware config
// export const config = {
//     matcher: [
//         '/Components/AddProduct',
//         '/Components/AllProducts',
//         '/Components/WareHouse',
//         '/login',
//         '/signup',
//     ],
// };




// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // // Define roles
// // const adminRoutes = [
// //     '/Components/AddProduct',
// //     '/Components/AllProducts',
// //     '/Components/WareHouse',
// //     '/Dashboard/Filter',
// // ];

// // const userRoutes = [
// //     '/Components/AddProduct',
// //     '/Components/AllProducts',
// //     '/Components/WareHouse',
// // ];

// // const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key'; // Ensure the secret key is at least 32 characters for HMAC SHA-256

// // // Helper function to decode base64 URL
// // function base64UrlDecode(input: string) {
// //     input = input.replace(/-/g, '+').replace(/_/g, '/');
// //     const pad = input.length % 4 === 0 ? '' : '==='.slice(0, 4 - (input.length % 4));
// //     return new TextDecoder().decode(Uint8Array.from(atob(input + pad), c => c.charCodeAt(0)));
// // }

// // // Verify the JWT token using Web Crypto API
// // async function verifyJWT(token: string, secretKey: CryptoKey): Promise<any> {
// //     const [header, payload, signature] = token.split('.');

// //     if (!header || !payload || !signature) {
// //         throw new Error("Invalid token format");
// //     }

// //     const data = `${header}.${payload}`;
// //     const signatureBuffer = Uint8Array.from(atob(signature), char => char.charCodeAt(0));

// //     const isValid = await crypto.subtle.verify(
// //         { name: "HMAC" },
// //         secretKey,
// //         signatureBuffer,
// //         new TextEncoder().encode(data)
// //     );

// //     if (!isValid) {
// //         throw new Error("Token signature is invalid");
// //     }

// //     return JSON.parse(base64UrlDecode(payload));
// // }

// // // Generate the secret key for HMAC
// // async function getSecretKey() {
// //     return await crypto.subtle.importKey(
// //         "raw",
// //         new TextEncoder().encode(TOKEN_SECRET),
// //         { name: "HMAC", hash: { name: "SHA-256" } },
// //         false,
// //         ["verify"]
// //     );
// // }

// // export async function middleware(request: NextRequest) {
// //     const path = request.nextUrl.pathname;
// //     const token = request.cookies.get('token')?.value || '';

// //     // Redirect to login if no token
// //     if (!token) {
// //         return NextResponse.redirect(new URL('/login', request.url));
// //     }

// //     try {
// //         // Verify the token using Web Crypto API
// //         const secretKey = await getSecretKey();
// //         const decoded = await verifyJWT(token, secretKey);

// //         const userRole = decoded.role; // Extract user role from token

// //         // Admin-only routes
// //         if (adminRoutes.includes(path)) {
// //             if (userRole !== 'admin') {
// //                 return NextResponse.redirect(new URL('/unauthorized', request.url));
// //             }
// //         }

// //         // User routes (accessible by both 'admin' and 'user')
// //         if (userRoutes.includes(path)) {
// //             if (userRole !== 'admin' && userRole !== 'user') {
// //                 return NextResponse.redirect(new URL('/unauthorized', request.url));
// //             }
// //         }

// //         // Proceed to the requested route if everything is valid
// //         return NextResponse.next();

// //     } catch (error) {
// //         console.error("Token verification failed:", error);
// //         return NextResponse.redirect(new URL('/login', request.url));
// //     }
// // }

// // // Middleware config
// // export const config = {
// //     matcher: [
// //         '/Components/AddProduct',
// //         '/Components/AllProducts',
// //         '/Components/WareHouse',
// //         '/Dashboard/Filter',
// //         '/login',
// //         '/unauthorized', // Page to show unauthorized access
// //     ],
// // };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const TOKEN_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET || 'Secret_Key');

    let userRole = null;
    if (token) {
        try {
            const { payload } = await jwtVerify(token, TOKEN_SECRET);
            userRole = payload.role; 
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }

    const isPublicPath = ['/login', '/signup'].includes(path);
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const protectedPaths = ['/Components/AddProduct', '/Components/AllProducts', '/Components/WareHouse'];
    if (protectedPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const adminPaths = ['/Components/AddVendor', '/Dashboard/Filter'];
    if (adminPaths.includes(path) && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
}

export const config = {
    matcher: [
        '/Components/AddProduct',
        '/Components/AllProducts',
        '/Components/WareHouse',
        '/Components/AddVendor',
        '/Dashboard/Filter',
        '/profile',
        '/login',
        '/signup',
        '/unauthorized',
    ],
};
