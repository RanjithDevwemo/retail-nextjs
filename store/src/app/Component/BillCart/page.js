// 'use client';
// import React, { useState,useCallback } from 'react';
// import axios from 'axios';
// import { useAppContext } from '@/app/Context';
// import { MdDelete } from "react-icons/md";
// import Link from 'next/link';

// function Billcart() {
//     const { cartItems,setCartItems } = useAppContext();
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');




//      // Handle quantity change
//      const handleQuantityChange = useCallback(async (itemId, newQuantity,warehouse) => {
//         if (newQuantity < 1) return;
//         try {
//             // Optimistically update state
//             setCartItems(prevItems =>
//                 prevItems.map(item =>
//                     item._id === itemId ? { ...item, quantity: newQuantity } : item
//                 )
//             );
//             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity,warehouse });
//         } catch (err) {
//             console.error('Error updating quantity:', err.message);
//             // Optionally revert the optimistic update in case of error
//             setCartItems(prevItems => 
//                 prevItems.map(item => 
//                     item._id === itemId ? { ...item, quantity: newQuantity - 1 } : item
//                 )
//             );
//         }
//     }, [setCartItems]);

// const orderConfirm =async ()=>{

// }
//     const handleDelete = useCallback(async (itemId) => {
//         try {
//             // Optimistically remove item from state
//             setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));

//             await axios.delete(`http://localhost:4000/single/product/${itemId}`);
//         } catch (error) {
//             console.log('Error deleting item:', error);
            
//             fetchCartItems();
//         }
//     }, [setCartItems]);


//     const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
//     const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//     return (
//         <div className="p-4 rounded-lg  text-black bg-white">
//             <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
//                 <h1 className="text-xl sm:text-2xl">Cart</h1>
//             </div>
//             <form className="mt-4 bg-slate-200 p-4 space-y-4">
//                 {/* Cart Items */}
//                 <div className="space-y-4">
//                     {cartItems.map((item) => (
//                         <div key={item._id}>
//                             <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
//                                 <div className="flex flex-col">
//                                     <h2 className="text-md sm:text-lg font-bold">{item.productName}</h2>
//                                     <span className="flex gap-2">
//                                         <p className="text-sm">${item.productPrice.toFixed(2)}</p>
//                                         <p className="text-sm">IGST 18%</p>
//                                         <p className="text-sm">warehouse : {item.warehouse}</p>
                                        
//                                     </span>
//                                 </div>
//                                 <div className="flex items-center flex-col">
//                                     <div className='flex items-center'>
//                                         <button
//                                             type="button"
//                                             className="bg-blue-500 text-white rounded px-1 sm:px-2"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity + 1,item.warehouse)}
//                                         >
//                                             +
//                                         </button>
//                                         <span className="mx-1 font-bold">X{item.quantity}</span>
//                                         <button
//                                             type="button"
//                                             className="bg-gray-500 text-white rounded px-1 sm:px-2"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity - 1,item.warehouse)}
//                                         >
//                                             -
//                                         </button>
//                                     </div>
//                                     <p className="ml-2 text-sm">SKU: {item.sku}</p>
//                                 </div>
//                                 <div>
//                                     <MdDelete size={20} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
//                                 </div>
//                             </div>
//                             <hr className="w-full border border-slate-300" />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Total Quantity and Price */}
//                 <div className="flex flex-col md:flex-row justify-between mt-4">
//                     <h1 className="text-lg sm:text-xl font-bold">Total</h1>
//                     <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-between mt-4">
//                     <ul className="text-sm">
//                         <li>CGST</li>
//                         <li>SGST</li>
//                     </ul>
//                     <ul className="text-sm">
//                         <li>Quantity: {totalQuantity}</li>
//                         <li>Total items: {cartItems.length}</li>
//                     </ul>
//                 </div>
             

//                 {/* Customer Info and Payment */}
                
//                 <div className="mt-4 bg-blue-500 p-4 rounded text-white">
//                     <div className="flex flex-col md:flex-row md:items-center mb-2">
//                         <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerName">Customer Name:</label>
//                         <input
//                             type="text"
//                             placeholder='Enter Customer Name :'
//                             id="customerName"
//                             value={customerName}
//                             onChange={(e) => setCustomerName(e.target.value)}
//                             className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col md:flex-row md:items-center mb-2">
//                         <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
//                         <input
//                             type="tel" // Changed to 'tel' for better mobile handling
//                             id="customerPhoneNumber"
//                             value={customerPhoneNumber}
//                             onChange={(e) => setCustomerPhoneNumber(e.target.value)}
//                             className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
//                             required
//                         />
//                     </div>

//                     {/* Address Input */}
//                     <div className="flex flex-col md:flex-row md:items-center mb-4">
//                         <label className="w-full md:w-1/3 font-bold text-sm" htmlFor="address">Address:</label>
//                         <textarea
//                             id="address"
//                             placeholder='Enter your address...'
//                             rows={3}
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             className='w-full md:w-2/3 p-2 border rounded text-sm text-black'
//                             required
//                         />
//                     </div>

//                     <button
//                         type="button"
//                         onClick={orderConfirm}
//                         className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
//                     >
//                        <Link className="bg-black text-white p-2 rounded mt-4 w-full text-sm" href="/Component/BillConfirm" >
//                         order Confirm</Link>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Billcart;











'use client';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/app/Context';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';

function Billcart() {
    const { cartItems, setCartItems } = useAppContext();
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    // Handle quantity change
    const handleQuantityChange = useCallback(async (itemId, newQuantity, warehouse) => {
        if (newQuantity < 1) return;
        try {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
            await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity, warehouse });
        } catch (err) {
            console.error('Error updating quantity:', err.message);
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item._id === itemId ? { ...item, quantity: newQuantity - 1 } : item
                )
            );
        }
    }, [setCartItems]);

    const handleDelete = useCallback(async (itemId) => {
        try {
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            await axios.delete(`http://localhost:4000/single/product/${itemId}`);
        } catch (error) {
            console.log('Error deleting item:', error);
            // Optionally refresh cart items
        }
    }, [setCartItems]);

    const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="p-4 rounded-lg text-black bg-white">
            <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
                <h1 className="text-xl sm:text-2xl">Cart</h1>
            </div>
            <form className="mt-4 bg-slate-200 p-4 space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id}>
                            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
                                <div className="flex flex-col">
                                    <h2 className="text-md sm:text-lg font-bold">{item.productName}</h2>
                                    <span className="flex gap-2">
                                        <p className="text-sm">${item.productPrice.toFixed(2)}</p>
                                        <p className="text-sm">IGST 18%</p>
                                        <p className="text-sm">Warehouse: {item.warehouse}</p>
                                    </span>
                                </div>
                                <div className="flex items-center flex-col">
                                    <div className='flex items-center'>
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.warehouse)}
                                        >
                                            +
                                        </button>
                                        <span className="mx-1 font-bold">X{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="bg-gray-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.warehouse)}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <p className="ml-2 text-sm">SKU: {item.sku}</p>
                                </div>
                                <div>
                                    <MdDelete size={20} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
                                </div>
                            </div>
                            <hr className="w-full border border-slate-300" />
                        </div>
                    ))}
                </div>

                {/* Total Quantity and Price */}
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <h1 className="text-lg sm:text-xl font-bold">Total</h1>
                    <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <ul className="text-sm">
                        <li>CGST</li>
                        <li>SGST</li>
                    </ul>
                    <ul className="text-sm">
                        <li>Quantity: {totalQuantity}</li>
                        <li>Total items: {cartItems.length}</li>
                    </ul>
                </div>

                {/* Customer Info */}
                <div className="mt-4 bg-blue-500 p-4 rounded text-white">
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                        <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerName">Customer Name:</label>
                        <input
                            type="text"
                            placeholder='Enter Customer Name'
                            id="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
                            required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                        <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
                        <input
                            type="tel"
                            id="customerPhoneNumber"
                            value={customerPhoneNumber}
                            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                            className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
                            required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <label className="w-full md:w-1/3 font-bold text-sm" htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            placeholder='Enter your address...'
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full md:w-2/3 p-2 border rounded text-sm text-black'
                            required
                        />
                    </div>

                    {/* Link to confirm order */}
                    <Link
                        href={{
                            pathname: "/Component/BillConfirm",
                            query: {
                                customerName,
                                customerPhoneNumber,
                                address,
                                cartItems: JSON.stringify(cartItems),
                                totalValue,
                            }
                        }}
                        className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
                    >
                        Confirm Order
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Billcart;
