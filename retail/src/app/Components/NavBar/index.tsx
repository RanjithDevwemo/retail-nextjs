import Link from "next/link"


export default function NavBar() {
  return (
    <div className="flex items-center justify-around gap-2">
      NavBar
<div >
    <ul className="flex items-center justify-between gap-2">
        <li><Link href='/Components/AddProduct'>AddProduct</Link></li>
      <li><Link href='/Components/AllProducts'>AllProducts</Link></li>
      <li><Link href='/Components/WareHouse'>WareHouse</Link></li>
      <li><Link href='/Components/AddVentor'>Add Ventor</Link></li>
      <li><Link href='/Pages/AllProducts'>Products</Link></li>
      <li><Link href='/Dashboard/Filter'>DashHome</Link></li>
      
    </ul>
</div>
    </div>
  )
}
