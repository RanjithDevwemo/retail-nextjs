

// // NavBar.tsx
// 'use client';
// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function NavBar() {
//     const [userName, setUserName] = useState(null);
//     const[data,setData]=useState('');
//     const router = useRouter();

//     const fetchUserDetails = async () => {
//         try {
//             const res = await axios.get('/api/users/me');
//             setData(res.data.data.role);
//             setUserName(res.data.data.username);
//         } catch (error) {
//             console.error(error.message);
//             setUserName(null); // User not logged in
//         }
//     };
//     console.log(data);
    

//     const logout = async () => {
//         try {
//             await axios.get('/api/users/logout');
//             toast.success("Logout successful");
//             setUserName(null);
//             router.push('/login');
//         } catch (error) {
//             console.error(error.message);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         fetchUserDetails();
//     }, []);

//     return (
//         <div className="flex items-center justify-around gap-2">
//             <div>
//                 <ul className="flex items-center justify-between gap-2">
//                     <li><Link href='/Components/AddProduct'>Add Product</Link></li>
//                     <li><Link href='/Components/AllProducts'>All Products</Link></li>
//                     <li><Link href='/Components/WareHouse'>Warehouse</Link></li>
//                     <li><Link href='/Components/AddVendor'>Add Vendor</Link></li>
//                     <li><Link href='/Pages/AllProducts'>Products</Link></li>
//                     <li><Link href='/Dashboard/Filter'>Dashboard Home</Link></li>
//                 </ul>
//             </div>

//             {userName ? (
//                 <div className="flex items-center gap-4">
//                     <span>{`${userName}`}</span>
//                     <button onClick={logout} className="bg-blue-500 text-white p-2">Logout</button>
//                 </div>
//             ) : (
//                 <Link href="/login" className="bg-blue-500 text-white p-2">Login</Link>
//             )}
//         </div>
//     );
// }






'use client';
import Link from "next/link";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/app/Context";

export default function NavBar() {
    const { userName, updateUserDetails } =useAppContext();
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            updateUserDetails(); // Optional: to ensure the latest user details are fetched
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error("Logout failed: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-around gap-2">
            <div>
                <ul className="flex items-center justify-between gap-2">
                    <li><Link href='/Components/AddProduct'>Add Product</Link></li>
                    <li><Link href='/Components/AllProducts'>All Products</Link></li>
                    <li><Link href='/Components/WareHouse'>Warehouse</Link></li>
                    <li><Link href='/Components/AddVendor'>Add Vendor</Link></li>
                    <li><Link href='/Pages/AllProducts'>Products</Link></li>
                    <li><Link href='/Dashboard/Filter'>Dashboard Home</Link></li>
                </ul>
            </div>

            {userName ? (
                <div className="flex items-center gap-4">
                    <span>{userName}</span>
                    <button onClick={logout} className="bg-blue-500 text-white p-2">Logout</button>
                </div>
            ) : (
                <Link href="/login" className="bg-blue-500 text-white p-2">Login</Link>
            )}
        </div>
    );
}
