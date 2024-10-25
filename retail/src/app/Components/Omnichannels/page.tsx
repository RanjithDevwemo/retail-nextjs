import Link from "next/link";

export default function Omnichannel() {
  return (
    <div className="flex items-center justify-around">
   <button className="bg-black text-white p-5"><Link href={'/Pages/Shopify'}> Shopify</Link></button>
    <button className="bg-black text-white p-5"><Link href={'/Pages/Woocommerce'} > Woocommerce</Link></button>
    </div>
  )
}
