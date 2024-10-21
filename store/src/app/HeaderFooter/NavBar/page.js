
'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/app/Context";

export default function NavBar() {
    const { userName, updateUserDetails } = useAppContext();
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            updateUserDetails(); // Optional: to refresh user details
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error("Logout failed: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-around gap-2">
            {userName ? (
                <>
                    <ul className="flex items-center justify-between gap-2">
                        <li><Link href='/Pages/DashBoard'>Dashboard</Link></li>
                        <li><Link href='/Pages/Purchase'>Purchase</Link></li>
                        <li><Link href='/Pages/Sales'>Sales</Link></li>
                        <li><Link href='/Component/AllWarehouse'>All Warehouse</Link></li>
                        <li><Link href='/Component/TodayTopFive'>Today’s Top Five</Link></li>
                        <li><Link href='/Component/LowStockFive'>Top Five Low Stock Items</Link></li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <span>{userName}</span>
                        <button onClick={logout} className="bg-blue-500 text-white p-2">Logout</button>
                    </div>
                </>
            ) : (
                <Link href="/login" className="bg-blue-500 text-white p-2">Login</Link>
            )}
        </div>
    );
}
