
// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';
// import '@/app/Component/BillCart/Billcart.css'
// import { useAppContext } from '@/app/Context';

// function Billcart() {
//     const { cartItems } = useAppContext();
//     const [error, setError] = useState(null);
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//     const [paymentType, setPaymentType] = useState('cash_on_hand');
//     const [upiId, setUpiId] = useState('');
//     const [cardNo, setCardNo] = useState('');
//     const handleQuantityChange = async (itemId, newQuantity) => {
//         if (newQuantity < 1) return; 
//         try {
//             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
//             window.location.reload(); 
//         } catch (err) {
//             setError('Failed to update quantity');
//             console.error('Error updating quantity:', err.message);
//         }
//     };

// console.log("cartItems : ",cartItems);


//     const handleDelete = async (itemId) => {
//         try {
//             await axios.delete(`http://localhost:4000/single/product/${itemId}`);
//             window.location.reload();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const ProductOrder = async () => {
//         try {
//             let totalValue = 0;
//             let totalQuantity = 0;

//             cartItems.forEach(item => {
//                 totalValue += item.quantity * item.productPrice;
//                 totalQuantity += item.quantity;
//             });

//             totalValue = totalValue.toFixed(2);

//             const orderData = {
//                 items: cartItems,
//                 totalValue,
//                 totalQuantity,
//                 customerName,
//                 customerPhoneNumber,
//                 paymentType,
//                 upiId: paymentType === 'upiId' ? upiId : '',
//                 cardNo: paymentType === 'cardNo' ? cardNo : ''
//             };

//             console.log(orderData);
//             await axios.post('http://localhost:4000/order', orderData);
//             window.location.reload();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     let totalValue = 0;
//     let totalQuantity = 0;

//     cartItems.forEach(item => {
//         totalValue += item.quantity * item.productPrice;
//         totalQuantity += item.quantity;
//     });

//     totalValue = totalValue.toFixed(2);

//     return (
//       <div className='billcart'>
//         <form className='form'>
//         <div className='customer-details'>
//             <div>
//             <input placeholder='Customer name : ' className='in' />
//             </div>
//             <div>
//             <input placeholder='Phone number : ' className='in' />
//             </div>
//             <div>

//             <textarea placeholder='Address : ' rows={4} cols={10} className='text-area'>

//             </textarea>
//             </div>
//         </div>
// <div className='order-products'>
//     {/* {cartItems.map((item,index)=>())} */}
//     <div className='cash'>
//        <h2> Books 1</h2>
//        <span>
//         <p>60.00</p>
//         <p>IGST18</p>
//        </span>
//     </div>
//     <div className='quantity'>
//         <div>  <button>+</button>
// 5  <button>-</button>
//         </div>
// <div className='sku'>
//     <p>sku:0000000</p>
// </div>
//     </div>
//     <div className='amount'>
//     <h1>$3000</h1>
//     </div>
//     <hr/>
// </div>



//                 {/* <div>
          
//                        <h1>Cart Items</h1>
//                        {error && <p>{error}</p>}
//                       {cartItems.length === 0 ? (
//                           <p>No items in the cart.</p>
//                       ) : (
//                           <div>
//                               <table border={2}>
//                                   <thead>
//                                       <tr>
//                                           <th>Product Name</th>
//                                           <th>Product Price</th>
//                                           <th>Category</th>
//                                           <th>Quantity</th>
//                                           <th>Single Product Total</th>
//                                           <th>GST</th>
//                                           <th>SKU</th>
//                                           <th>Delete</th>
//                                       </tr>
//                                   </thead>
//                                   <tbody>
//                                       {cartItems.map((item) => (
//                                           <tr key={item._id}>
//                                               <td>{item.productName}</td>
//                                               <td>${item.productPrice.toFixed(2)}</td>
//                                               <td>{item.category}</td>
//                                               <td>
//                                                   <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
//                                                   <span>{item.quantity}</span>
//                                                   <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
//                                               </td>
//                                               <td>${(item.quantity * item.productPrice).toFixed(2)}</td>
//                                               <td>{item.gst}%</td>
//                                               <td>{item.sku}</td>
//                                               <td onClick={() => handleDelete(item._id)}>del</td>
//                                           </tr>
//                                       ))}
//                                   </tbody>
//                                   <tfoot>
//                                       <tr>
//                                           <td colSpan="4"><strong>Total Value</strong></td>
//                                           <td colSpan="4">${totalValue}</td>
//                                       </tr>
//                                       <tr>
//                                           <td colSpan="4"><strong>Total Quantity</strong></td>
//                                           <td colSpan="4">{totalQuantity}</td>
//                                       </tr>
//                                       <tr>
//                                           <td colSpan="8">
//                                               <div>
//                                                   <input
//                                                       type="text"
//                                                       placeholder="Customer Name"
//                                                       value={customerName}
//                                                       onChange={(e) => setCustomerName(e.target.value)}
//                                                       required
//                                                   />
//                                                   <input
//                                                       type="text"
//                                                       placeholder="Customer Phone Number"
//                                                       value={customerPhoneNumber}
//                                                       onChange={(e) => setCustomerPhoneNumber(e.target.value)}
//                                                       required
//                                                   />
//                                                   <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
//                                                       <option value="cash_on_hand">Cash on hand</option>
//                                                       <option value="upiId">UPI ID</option>
//                                                       <option value="cardNo">Card Number</option>
//                                                   </select>
//                                                   {paymentType === 'upiId' && (
//                                                       <input
//                                                           type="text"
//                                                           placeholder="Enter UPI ID"
//                                                           value={upiId}
//                                                           onChange={(e) => setUpiId(e.target.value)}
//                                                           required
//                                                       />
//                                                   )}
//                                                   {paymentType === 'cardNo' && (
//                                                       <input
//                                                           type="text"
//                                                           placeholder="Enter Card Number"
//                                                           value={cardNo}
//                                                           onChange={(e) => setCardNo(e.target.value)}
//                                                           required
//                                                       />
//                                                   )}
//                                               </div>
//                                               <button onClick={ProductOrder}>Order Confirm</button>
//                                           </td>
//                                       </tr>
//                                   </tfoot>
//                               </table>
//                           </div>
//                       )}
//                   </div> */}
          
//         </form>
//       </div>
//     );
// }

// export default Billcart;




// <div className='billcart'>
// <form className='form'>
// <div className='customer-details'>
//     <div>
//     <input placeholder='Customer name : ' className='in' />
//     </div>
//     <div>
//     <input placeholder='Phone number : ' className='in' />
//     </div>
//     <div>

//     <textarea placeholder='Address : ' rows={4} cols={10} className='text-area'>

//     </textarea>
//     </div>
// </div>
// <div className='order-products'>
// {/* {cartItems.map((item,index)=>())} */}
// <div className='cash'>
// <h2> Books 1</h2>
// <span>
// <p>60.00</p>
// <p>IGST18</p>
// </span>
// </div>
// <div className='quantity'>
// <div>  <button>+</button>
// 5  <button>-</button>
// </div>
// <div className='sku'>
// <p>sku:0000000</p>
// </div>
// </div>
// <div className='amount'>
// <h1>$3000</h1>
// </div>
// <hr/>
// </div>



 

// Billcart.js
'use client'
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/app/Context';
import { MdDelete } from "react-icons/md";

function Billcart() {
    const { cartItems, setCartItems } = useAppContext();
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('cash_on_hand');
    const [upiId, setUpiId] = useState('');
    const [cardNo, setCardNo] = useState('');

    // Handle quantity change
    const handleQuantityChange = useCallback(async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            // Optimistically update state
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );

            await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
        } catch (err) {
            console.error('Error updating quantity:', err.message);
            // Optionally revert the optimistic update in case of error
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item._id === itemId ? { ...item, quantity: newQuantity - 1 } : item
                )
            );
        }
    }, [setCartItems]);

    // Handle item deletion
    const handleDelete = useCallback(async (itemId) => {
        try {
            // Optimistically remove item from state
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));

            await axios.delete(`http://localhost:4000/single/product/${itemId}`);
        } catch (error) {
            console.log('Error deleting item:', error);
            
            fetchCartItems();
        }
    }, [setCartItems]);

    // Calculate total value and quantity
    const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Handle order placement
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

            await axios.post('http://localhost:4000/order', orderData);
            setCartItems([]); // Clear the cart after placing the order
            setCustomerName('');
            setCustomerPhoneNumber('');
            setAddress('');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="p-4 rounded-lg shadow-md text-black bg-white">
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
                                    </span>
                                </div>
                                <div className="flex items-center flex-col">
                                    <div className='flex items-center'>
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <span className="mx-1 font-bold">X{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="bg-gray-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
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

                {/* Customer Info and Payment */}
                <div className="mt-4 bg-blue-500 p-4 rounded text-white">
                    {/* Customer info inputs here... */}
                    <button
                        type="button"
                        onClick={handleOrderPlacement}
                        className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Billcart;
