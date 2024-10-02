
import Filter from '@/app/Components/Filter/page'
import Product1 from "@/app/Components/Products1/page"

export default function page() {
  return (
    <div className="flex items-center justify-start">
      <div className="p-3 w-1/5">
      <Filter/>
      </div>
      <div className="p-4 w-4/5">
      <Product1/>
      </div>
    </div>
  )
}

