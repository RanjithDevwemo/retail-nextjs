import Link from "next/link"
import '@/app/HeaderFooter/nav.css'

export default function NavBar() {
  return (
    <div className="nav">
      <div className="logo">
      NavBar
      </div>
      <div className="links">
       
        <ul>
            
            <li><Link href='/Pages/DashBoard'>DashBoard</Link></li>
            <li><Link href='/Pages/Purchase'>Purchase</Link></li>
            <li><Link href='/Pages/Sales'>sales</Link></li>
            <li><Link href='/Component/TodayTopFive'>Today Top Five</Link></li>
            <li><Link href='/Component/LowStockFive'>Top Five Low Stock Items</Link></li>
            <li><Link href='/Pages/Login'>Login</Link></li>
            <li><Link href='/Pages/SignUp'>SignUp</Link></li>
            
            
        </ul>
      </div>
    </div>
  )
}
