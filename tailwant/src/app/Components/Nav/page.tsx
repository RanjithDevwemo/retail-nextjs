import Link from "next/link"


export default function Nav() {
  return (
    <div className="bg-black text-white flex items-center justify-evenly">
      <div className="">
        Nav
      </div>
      <ul className="flex gap-4 cursor-pointer">
        <li><Link href='/Pages/Products'>Products</Link></li>
        <li>Store DashBorad</li>
      </ul>
    </div>
  )
}
