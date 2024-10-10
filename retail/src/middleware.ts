

// // // // // middleware.ts
// // // // import { NextResponse } from 'next/server';
// // // // import type { NextRequest } from 'next/server';

// // // // export function middleware(request: NextRequest) {
// // // //     const path = request.nextUrl.pathname;
// // // //     const isPublicPath = path === '/login' || path === '/signup';
// // // //     const token = request.cookies.get('token')?.value || '';

// // // //     if (isPublicPath && token) {
// // // //         return NextResponse.redirect(new URL('/', request.url));
// // // //     }

// // // //     if (!isPublicPath && !token) {
// // // //         return NextResponse.redirect(new URL('/login', request.url));
// // // //     }
// // // // }

// // // // export const config = {
// // // //     matcher: [
// // // //         '/Components/AddProduct',
// // // //         '/Components/AllProducts',
// // // //         '/Components/WareHouse',
// // // //         '/Components/AddVendor',
// // // //         '/Pages/AllProducts',
// // // //         '/Dashboard/Filter',
// // // //         '/',
// // // //         '/profile',
// // // //         '/login',
// // // //         '/signup',
// // // //     ],
// // // // };



// // // import { NextResponse } from 'next/server';
// // // import type { NextRequest } from 'next/server';

// // // export function middleware(request: NextRequest) {
// // //     const path = request.nextUrl.pathname;
// // //     const isPublicPath = ['/login', '/signup'].includes(path);
// // //     const token = request.cookies.get('token')?.value || '';

// // //     // Redirect if a logged-in user tries to access public routes
// // //     if (isPublicPath && token) {
// // //         return NextResponse.redirect(new URL('/', request.url));
// // //     }

// // //     // Redirect to login if trying to access protected routes without a token
// // //     if (!isPublicPath && !token) {
// // //         return NextResponse.redirect(new URL('/login', request.url));
// // //     }
// // // }

// // // export const config = {
// // //     matcher: [
// // //         '/Components/AddProduct',
// // //         '/Components/AllProducts',
// // //         '/Components/WareHouse',
// // //         '/Components/AddVendor',
// // //         '/Pages/AllProducts',
// // //         '/Dashboard/Filter',
// // //         '/',
// // //         '/profile',
// // //         '/login',
// // //         '/signup',
// // //     ],
// // // };




// // // // // middleware.ts
// // // // import { NextResponse } from 'next/server';
// // // // import type { NextRequest } from 'next/server';
// // // // import jwt from 'jsonwebtoken';

// // // // const Token_Secret = 'Secret_Key'; // Use your actual secret key

// // // // export function middleware(request: NextRequest) {
// // // //     const path = request.nextUrl.pathname;
// // // //     const isPublicPath = path === '/login' || path === '/signup';
// // // //     const token = request.cookies.get('token')?.value || '';

// // // //     if (token) {
// // // //         try {
// // // //             // Decode the token to get user role
// // // //             const decoded = jwt.verify(token, Token_Secret) as { role: string };

// // // //             // Redirect if user tries to access login/signup while authenticated
// // // //             if (isPublicPath) {
// // // //                 return NextResponse.redirect(new URL('/', request.url));
// // // //             }

// // // //             // Admin-only access check
// // // //             if (path.startsWith('/admin-only') && decoded.role !== 'admin') {
// // // //                 return NextResponse.redirect(new URL('/unauthorized', request.url)); 
// // // //             }

// // // //         } catch (error) {
// // // //             console.error('Token verification failed:', error);
// // // //             // Optionally clear the cookie on token verification failure
// // // //             return NextResponse.redirect(new URL('/login', request.url));
// // // //         }
// // // //     } else {
// // // //         // Redirect unauthenticated users from protected routes
// // // //         if (!isPublicPath) {
// // // //             return NextResponse.redirect(new URL('/login', request.url));
// // // //         }
// // // //     }
// // // // }

// // // // export const config = {
// // // //     matcher: [
// // // //         '/Components/AddProduct',
// // // //         '/Components/AllProducts',
// // // //         '/Components/WareHouse',
// // // //         '/Components/AddVendor',
// // // //         '/Pages/AllProducts',
// // // //         '/Dashboard/Filter',
// // // //         '/profile',
// // // //         '/admin-only', // Add your admin-only routes here
// // // //         '/login',
// // // //         '/signup',
// // // //     ],
// // // // };



import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/signup'].includes(path);
    const token = request.cookies.get('token')?.value || '';
    const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key';
    // Decode the token to get user role
    let userRole = '';
    if (token) {
        try {
            const decoded = jwt.verify(token, TOKEN_SECRET); 
            console.log(decoded);
            
            userRole = decoded.role; 
            console.log("userRole : ",userRole);
            
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }

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
        '/',
        '/profile',
    ];

    // Redirect to login if trying to access protected routes without a token
    if (protectedPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin-specific access control (example)
    const adminPaths = [
        '/Components/AddVendor',
        '/Components/AddProduct',
        '/Dashboard/Filter',
    ];

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
        '/Pages/AllProducts',
        '/Dashboard/Filter',
        '/',
        '/profile',
        '/login',
        '/signup',
        '/unauthorized', // Page to show unauthorized access
    ],
};







