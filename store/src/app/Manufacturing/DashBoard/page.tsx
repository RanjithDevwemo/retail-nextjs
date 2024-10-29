import React from 'react'
import CartPage from '../Pages/ManufacturingCart/page'
import ManufacturingProductList from '../Pages/ManuFacturingProducts/page'

export default function page() {
  return (
    <div className='flex items-center justify-around'>
    <ManufacturingProductList/>
      
    <CartPage/>
    
    </div>
  )
}



