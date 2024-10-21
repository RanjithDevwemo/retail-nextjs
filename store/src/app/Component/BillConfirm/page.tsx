// // 'use client';
// // import React, { useState,useCallback } from 'react';
// // import axios from 'axios';
// // import { useAppContext } from '@/app/Context';
// // import { MdDelete } from "react-icons/md";
// // import Link from 'next/link';

// // function BillConfirm() {
// //     const { cartItems,setCartItems } = useAppContext();
// //     const [customerName, setCustomerName] = useState('');
// //     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
// //     const [address, setAddress] = useState('');
// //     const [paymentType, setPaymentType] = useState('cash_on_hand');
// //     const [upiId, setUpiId] = useState('');
// //     const [cardNo, setCardNo] = useState('');

// //     const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// //     const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// //     const handleOrderPlacement = async () => {
// //         try {
// //             const orderData = {
// //                 items: cartItems,
// //                 totalValue,
// //                 totalQuantity,
// //                 customerName,
// //                 customerPhoneNumber,
// //                 address,
// //                 paymentType,
// //                 upiId: paymentType === 'upiId' ? upiId : '',
// //                 cardNo: paymentType === 'cardNo' ? cardNo : ''
// //             };

// //             await axios.post('http://localhost:4000/order', orderData);
// //             window.location.reload();
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };
// // console.log(cartItems);

// //     return (
    
// //         <div className="max-w-full mx-auto p-4 rounded-lg text-black bg-white">
// //     <div className="text-center bg-black text-white p-4 rounded-t-lg">
// //         <h1 className="text-xl sm:text-2xl">Bill Confirm Page</h1>
// //     </div>
// //     <form className="mt-4 bg-gray-100 p-4 space-y-4">
// //         {/* Cart Items Table */}
// //         <div className="overflow-x-auto">
// //             <table className="min-w-full bg-white border border-gray-300">
// //                 <thead>
// //                     <tr className="bg-gray-200">
// //                         <th className="py-2 px-3 text-left">Product</th>
// //                         <th className="py-2 px-3 text-left">Quantity</th>
// //                         <th className="py-2 px-3 text-left">Amount</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {cartItems.map((item) => (
// //                         <tr key={item._id} className="border-b">
// //                             <td className="py-3 px-3">{item.productName}<br/>
// //                             Price: {item.productPrice.toFixed(2)/item.quantity}</td>
// //                             <td className="py-3 px-3">X{item.quantity}</td>
// //                             <td className="py-3 px-3">${item.productPrice.toFixed(2)}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>

// //         {/* Total Quantity and Price */}
// //         <div className="flex flex-col md:flex-row justify-between mt-4">
// //             <h1 className="text-lg sm:text-xl font-bold">Total</h1>
// //             <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
// //         </div>
// //         <div className="flex flex-col md:flex-row justify-between mt-4">
// //             <ul className="text-sm">
// //                 <li>CGST</li>
// //                 <li>SGST</li>
// //             </ul>
// //             <ul className="text-sm">
// //                 <li>Quantity: {totalQuantity}</li>
// //                 <li>Total items: {cartItems.length}</li>
// //             </ul>
// //         </div>

// //         {/* Customer Info and Payment */}
// //         <div className="mt-4 bg-blue-500 p-4 rounded text-white">
// //             <div className="flex flex-col mb-2">
// //                 <label className="font-bold text-sm" htmlFor="customerName">Customer Name:</label>
// //                 <input
// //                     type="text"
// //                     placeholder='Enter Customer Name :'
// //                     id="customerName"
// //                     value={customerName}
// //                     onChange={(e) => setCustomerName(e.target.value)}
// //                     className="border rounded p-2 w-full text-sm text-black"
// //                     required
// //                 />
// //             </div>
// //             <div className="flex flex-col mb-2">
// //                 <label className="font-bold text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
// //                 <input
// //                     type="tel"
// //                     id="customerPhoneNumber"
// //                     value={customerPhoneNumber}
// //                     onChange={(e) => setCustomerPhoneNumber(e.target.value)}
// //                     className="border rounded p-2 w-full text-sm text-black"
// //                     required
// //                 />
// //             </div>

// //             {/* Address Input */}
// //             <div className="flex flex-col mb-4">
// //                 <label className="font-bold text-sm" htmlFor="address">Address:</label>
// //                 <textarea
// //                     id="address"
// //                     placeholder='Enter your address...'
// //                     rows={3}
// //                     value={address}
// //                     onChange={(e) => setAddress(e.target.value)}
// //                     className='w-full p-2 border rounded text-sm text-black'
// //                     required
// //                 />
// //             </div>

// //             {/* Payment Method Buttons */}
// //             <div className="flex flex-col items-center mb-4">
// //                 <div className="flex gap-5 w-full">
// //                     <button
// //                         type="button"
// //                         className={`p-2 w-full rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
// //                         onClick={() => setPaymentType('cash_on_hand')}
// //                     >
// //                         Cash on Hand
// //                     </button>
// //                     <button
// //                         type="button"
// //                         className={`p-2 w-full rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
// //                         onClick={() => setPaymentType('upiId')}
// //                     >
// //                         UPI ID
// //                     </button>
// //                     <button
// //                         type="button"
// //                         className={`p-2 w-full rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
// //                         onClick={() => setPaymentType('cardNo')}
// //                     >
// //                         Card Number
// //                     </button>
// //                 </div>
// //             </div>

// //             {paymentType === 'upiId' && (
// //                 <div className="flex flex-col mb-2">
// //                     <label className="font-bold text-sm">UPI ID:</label>
// //                     <input
// //                         type="text"
// //                         placeholder='Enter UPI ID'
// //                         value={upiId}
// //                         onChange={(e) => setUpiId(e.target.value)}
// //                         className="border rounded p-2 w-full text-sm"
// //                     />
// //                 </div>
// //             )}
// //             {paymentType === 'cardNo' && (
// //                 <div className="flex flex-col mb-2">
// //                     <label className="font-bold text-sm">Card Number:</label>
// //                     <input
// //                         type="text"
// //                         placeholder='Enter Card Number'
// //                         value={cardNo}
// //                         onChange={(e) => setCardNo(e.target.value)}
// //                         className="border rounded p-2 w-full text-sm text-black"
// //                     />
// //                 </div>
// //             )}
// //             <button
// //                 type="button"
// //                 onClick={handleOrderPlacement}
// //                 className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
// //             >
// //                 Place Order
// //             </button>

// //             <Link href="/Component/BillConfirm" className="mt-3 text-center text-blue-500">Order Confirm</Link>
// //         </div>
// //     </form>
// // </div>

// //     );
// // }

// // export default BillConfirm;





// 'use client';
// import React, { useEffect, useState } from 'react';

// function BillConfirm() {
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [cartItems, setCartItems] = useState([]);
//     const [totalValue, setTotalValue] = useState('');

//     useEffect(() => {
//         // Parse URL parameters using window.location
//         const urlParams = new URLSearchParams(window.location.search);
        
//         setCustomerName(urlParams.get('customerName') || '');
//         setCustomerPhoneNumber(urlParams.get('customerPhoneNumber') || '');
//         setAddress(urlParams.get('address') || '');
//         setTotalValue(urlParams.get('totalValue') || '');

//         const items = urlParams.get('cartItems');
//         if (items) {
//             // Decode and parse cartItems from JSON
//             const parsedItems = JSON.parse(decodeURIComponent(items));
//             setCartItems(parsedItems);
//         }
//     }, []);

//     return (
//         <div className="max-w-full mx-auto p-4 rounded-lg text-black bg-white">
//             <div className="text-center bg-black text-white p-4 rounded-t-lg">
//                 <h1 className="text-xl sm:text-2xl">Bill Confirm Page</h1>
//             </div>
//             <form className="mt-4 bg-gray-100 p-4 space-y-4">
//                 {/* Cart Items Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="py-2 px-3 text-left">Product</th>
//                                 <th className="py-2 px-3 text-left">Quantity</th>
//                                 <th className="py-2 px-3 text-left">Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartItems.map((item) => (
//                                 <tr key={item._id} className="border-b">
//                                     <td className="py-3 px-3">{item.productName}</td>
//                                     <td className="py-3 px-3">X{item.quantity}</td>
//                                     <td className="py-3 px-3">${(item.productPrice * item.quantity).toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Total Quantity and Price */}
//                 <div className="flex flex-col md:flex-row justify-between mt-4">
//                     <h1 className="text-lg sm:text-xl font-bold">Total</h1>
//                     <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
//                 </div>

//                 {/* Customer Info */}
//                 <div className="mt-4 bg-blue-500 p-4 rounded text-white">
//                     <h2 className="font-bold">Customer Details</h2>
//                     <p><strong>Name:</strong> {customerName}</p>
//                     <p><strong>Phone:</strong> {customerPhoneNumber}</p>
//                     <p><strong>Address:</strong> {address}</p>
//                 </div>

//                 {/* Finalize Order Button */}
//                 <button className="bg-green-500 text-white p-2 rounded mt-4 w-full">
//                     Finalize Order
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default BillConfirm;










'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BillConfirm() {
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [paymentType, setPaymentType] = useState('cash_on_hand');
    const [upiId, setUpiId] = useState('');
    const [cardNo, setCardNo] = useState('');

    const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        setCustomerName(urlParams.get('customerName') || '');
        setCustomerPhoneNumber(urlParams.get('customerPhoneNumber') || '');
        setAddress(urlParams.get('address') || '');

        const items = urlParams.get('cartItems');
        if (items) {
            const parsedItems = JSON.parse(decodeURIComponent(items));
            setCartItems(parsedItems);
        }
    }, []);

    const handleOrderPlacement = async () => {
        try {
            const orderData = {
                items: cartItems,
                totalValue,
                totalQuantity,
                customerName,
                customerPhoneNumber,
                address,
                paymentType,
                upiId: paymentType === 'upiId' ? upiId : '',
                cardNo: paymentType === 'cardNo' ? cardNo : ''
            };

           const val= await axios.post('http://localhost:4000/order', orderData);
            alert(val.data.message);
           
            // window.location.reload(); // Refresh the page after placing the order
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="max-w-full mx-auto p-4 rounded-lg text-black bg-white">
            <div className="text-center bg-black text-white p-4 rounded-t-lg">
                <h1 className="text-xl sm:text-2xl">Bill Confirm Page</h1>
            </div>
            <form className="mt-4 bg-gray-100 p-4 space-y-4">
                {/* Cart Items Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-3 text-left">Product</th>
                                <th className="py-2 px-3 text-left">Quantity</th>
                                <th className="py-2 px-3 text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="py-3 px-3">{item.productName}</td>
                                    <td className="py-3 px-3">X{item.quantity}</td>
                                    <td className="py-3 px-3">${(item.productPrice * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Quantity and Price */}
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <h1 className="text-lg sm:text-xl font-bold">Total</h1>
                    <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
                </div>

                {/* Customer Info */}
                <div className="mt-4 bg-blue-500 p-4 rounded text-white">
                    <h2 className="font-bold">Customer Details</h2>
                    <p><strong>Name:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhoneNumber}</p>
                    <p><strong>Address:</strong> {address}</p>
                </div>

                {/* Payment Method Selection */}
                <div className="mt-4">
                    <h2 className="font-bold text-white">Payment Method:</h2>
                    <button type="button" onClick={() => setPaymentType('cash_on_hand')} className={`p-2 ${paymentType === 'cash_on_hand' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>Cash on Hand</button>
                    <button type="button" onClick={() => setPaymentType('upiId')} className={`p-2 ${paymentType === 'upiId' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>UPI ID</button>
                    <button type="button" onClick={() => setPaymentType('cardNo')} className={`p-2 ${paymentType === 'cardNo' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>Card Number</button>

                    {paymentType === 'upiId' && (
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID" className="border rounded p-2 w-full mt-2" />
                    )}
                    {paymentType === 'cardNo' && (
                        <input type="text" value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="Enter Card Number" className="border rounded p-2 w-full mt-2" />
                    )}
                </div>

                {/* Place Order Button */}
                <button type="button" onClick={handleOrderPlacement} className="bg-green-500 text-white p-2 rounded mt-4 w-full">Place Order</button>
            </form>
        </div>
    );
}

export default BillConfirm;
