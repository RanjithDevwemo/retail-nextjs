// // // // 'use client';

// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';
// // // // import '@/app/Component/BillCart/Billcart.css';
// // // // import { useAppContext } from '@/app/Context';

// // // // function Billcart() {
// // // //     const { cartItems } = useAppContext();
// // // //     const [customerName, setCustomerName] = useState('');
// // // //     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
// // // //     const [paymentType, setPaymentType] = useState('cash_on_hand');
// // // //     const [upiId, setUpiId] = useState('');
// // // //     const [cardNo, setCardNo] = useState('');

// // // //     const handleQuantityChange = async (itemId, newQuantity) => {
// // // //         if (newQuantity < 1) return; 
// // // //         try {
// // // //             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
// // // //             window.location.reload(); 
// // // //         } catch (err) {
// // // //             console.error('Error updating quantity:', err.message);
// // // //         }
// // // //     };

// // // //     const ProductOrder = async () => {
// // // //         try {
// // // //             const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// // // //             const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// // // //             const orderData = {
// // // //                 items: cartItems,
// // // //                 totalValue,
// // // //                 totalQuantity,
// // // //                 customerName,
// // // //                 customerPhoneNumber,
// // // //                 paymentType,
// // // //                 upiId: paymentType === 'upiId' ? upiId : '',
// // // //                 cardNo: paymentType === 'cardNo' ? cardNo : ''
// // // //             };

// // // //             await axios.post('http://localhost:4000/order', orderData);
// // // //             window.location.reload();
// // // //         } catch (error) {
// // // //             console.error(error);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className='billcart'>
// // // //             <div className='customer-cart'>
// // // //                 <h1 className='cart-name'>Cart</h1>
// // // //             </div>
// // // //             <form className='form'>
// // // //                 <div className='order-products'>
// // // //                     {cartItems.map((item) => (
// // // //                         <div className='flex' key={item._id}>
// // // //                             <div className='cash'>
// // // //                                 <h2>{item.productName}</h2>
// // // //                                 <span>
// // // //                                     <p>${item.productPrice.toFixed(2)}</p>
// // // //                                     <p>IGST 18</p>
// // // //                                 </span>
// // // //                             </div>
// // // //                             <div className='quantity'>
// // // //                                 <span className='button'>
// // // //                                     <button className='plus' onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
// // // //                                     <span className='span'>*{item.quantity}</span>
// // // //                                     <button className='minus' onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
// // // //                                 </span>
// // // //                                 <span className='sku'>
// // // //                                     <p>SKU: {item.sku}</p>
// // // //                                 </span>
// // // //                             </div>
// // // //                             <div className='amount'>
// // // //                                 <h1>${(item.quantity * item.productPrice).toFixed(2)}</h1>
// // // //                             </div>
// // // //                             <hr /> 
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             </form>

// // // //             <div className='total'>
// // // //                 <h1>Total</h1>
// // // //                 <h1>${cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2)}</h1>
// // // //             </div>

// // // //             <div className='gst'>
// // // //                 <ul>
// // // //                     <li>CGST</li>
// // // //                     <li>SGST</li>
// // // //                 </ul>
// // // //                 <ul>
// // // //                     <li>Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</li>
// // // //                     <li>Total items: {cartItems.length}</li>
// // // //                 </ul>
// // // //             </div>

// // // //             <div className='payment-buttons'>
// // // //                 <button onClick={ProductOrder}>Cash F3</button>
// // // //                 <button onClick={ProductOrder}>Card F2</button>
// // // //                 <button onClick={ProductOrder}>UPI F4</button>
// // // //             </div>

// // // //             <div className='customer-details'>
// // // //                 <div>
// // // //                     <label>Customer name:</label>
// // // //                     <input 
// // // //                         value={customerName} 
// // // //                         onChange={(e) => setCustomerName(e.target.value)} 
// // // //                         placeholder='Customer name:' 
// // // //                         className='in' 
// // // //                     />
// // // //                 </div>
// // // //                 <div>
// // // //                     <label>Phone number:</label>
// // // //                     <input 
// // // //                         value={customerPhoneNumber} 
// // // //                         onChange={(e) => setCustomerPhoneNumber(e.target.value)} 
// // // //                         placeholder='Phone number:' 
// // // //                         className='in' 
// // // //                     />
// // // //                 </div>
// // // //                 <div>
// // // //                     <p>Address:</p>
// // // //                     <textarea 
// // // //                         placeholder='Address:' 
// // // //                         rows={4} 
// // // //                         cols={10} 
// // // //                         className='text-area' 
// // // //                     />
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Billcart;






// // // // 'use client';

// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';
// // // // import '@/app/Component/BillCart/Billcart.css';
// // // // import { useAppContext } from '@/app/Context';
// // // // import { MdDelete } from "react-icons/md";

// // // // function Billcart() {
// // // //     const { cartItems } = useAppContext();
// // // //     const [customerName, setCustomerName] = useState('');
// // // //     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
// // // //     const [paymentType, setPaymentType] = useState('cash_on_hand');
// // // //     const [upiId, setUpiId] = useState('');
// // // //     const [cardNo, setCardNo] = useState('');

    

// // // //     const handleQuantityChange = async (itemId, newQuantity) => {
// // // //         if (newQuantity < 1) return; 
// // // //         try {
// // // //             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
// // // //             window.location.reload(); 
// // // //         } catch (err) {
// // // //             console.error('Error updating quantity:', err.message);
// // // //         }
// // // //     };

// // // //     const handleDelete = async (itemId) => {
// // // //         try {
// // // //             await axios.delete(`http://localhost:4000/single/product/${itemId}`);
// // // //             window.location.reload();
// // // //         } catch (error) {
// // // //             console.log(error);
// // // //         }
// // // //     };    
    

// // // //     const ProductOrder = async () => {
// // // //         try {
// // // //             const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// // // //             const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// // // //             const orderData = {
// // // //                 items: cartItems,
// // // //                 totalValue,
// // // //                 totalQuantity,
// // // //                 customerName,
// // // //                 customerPhoneNumber,
// // // //                 paymentType,
// // // //                 upiId: paymentType === 'upiId' ? upiId : '',
// // // //                 cardNo: paymentType === 'cardNo' ? cardNo : ''
// // // //             };

// // // //             await axios.post('http://localhost:4000/order', orderData);
// // // //             window.location.reload();
// // // //         } catch (error) {
// // // //             console.error(error);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className='billcart'>
// // // //             <div className='customer-cart'>
// // // //                 <h1 className='cart-name'>Cart</h1>
// // // //             </div>
// // // //             <form className='form'>
// // // //                 <div className='order-products'>
// // // //                     {cartItems.map((item) => (
// // // //                         <div className='flex' key={item._id}>
// // // //                             <div className='cash'>
// // // //                                 <h2>{item.productName}</h2>
// // // //                                 <span>
// // // //                                     <p>${item.productPrice.toFixed(2)}</p>
// // // //                                     <p>IGST 18</p>
// // // //                                 </span>
// // // //                             </div>
// // // //                             <div className='quantity'>
// // // //                                 <span className='button'>
// // // //                                     <button className='plus' onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
// // // //                                     <span className='span'>*{item.quantity}</span>
// // // //                                     <button className='minus' onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
// // // //                                 </span>
// // // //                                 <span className='sku'>
// // // //                                     <p>SKU: {item.sku}</p>
// // // //                                 </span>
// // // //                             </div>
// // // //                             <div className='amount'>
// // // //                                 <h1>${(item.quantity * item.productPrice).toFixed(2)}</h1>
// // // //                             </div>
// // // //                             <button onClick={()=>{handleDelete(item._id)}}><MdDelete/></button>
// // // //                             <hr /> 
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             </form>

// // // //             <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
// // // //                                             <option value="cash_on_hand">Cash on hand</option>
// // // //                                             <option value="upiId">UPI ID</option>
// // // //                                             <option value="cardNo">Card Number</option>
// // // //                                         </select>
                                        
// // // //             <div className='total'>
// // // //                 <h1>Total</h1>
// // // //                 <h1>${cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2)}</h1>
// // // //             </div>

// // // //             <div className='gst'>
// // // //                 <ul>
// // // //                     <li>CGST</li>
// // // //                     <li>SGST</li>
// // // //                 </ul>
// // // //                 <ul>
// // // //                     <li>Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</li>
// // // //                     <li>Total items: {cartItems.length}</li>
// // // //                 </ul>
// // // //             </div>

// // // //             <div className='payment-buttons'>
// // // //                 <button onClick={ProductOrder}>Cash F3</button>
// // // //                 <button onClick={ProductOrder}>Card F2</button>
// // // //                 <button onClick={ProductOrder}>UPI F4</button>
// // // //             </div>

// // // //             <div className='customer-details'>
// // // //                 <div>
// // // //                     <label>Customer name:</label>
// // // //                     <input 
// // // //                         value={customerName} 
// // // //                         onChange={(e) => setCustomerName(e.target.value)} 
// // // //                         placeholder='Customer name:' 
// // // //                         className='in' 
// // // //                     />
// // // //                 </div>
// // // //                 <div>
// // // //                     <label>Phone number:</label>
// // // //                     <input 
// // // //                         value={customerPhoneNumber} 
// // // //                         onChange={(e) => setCustomerPhoneNumber(e.target.value)} 
// // // //                         placeholder='Phone number:' 
// // // //                         className='in' 
// // // //                     />
// // // //                 </div>
// // // //                 <div>
// // // //                     <p>Address:</p>
// // // //                     <textarea 
// // // //                         placeholder='Address:' 
// // // //                         rows={4} 
// // // //                         cols={10} 
// // // //                         className='text-area' 
// // // //                     />
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Billcart;








// // // 'use client';

// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useAppContext } from '@/app/Context';
// // // import { MdDelete } from "react-icons/md";

// // // function Billcart() {
// // //     const { cartItems } = useAppContext();
// // //     const [customerName, setCustomerName] = useState('');
// // //     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
// // //     const [paymentType, setPaymentType] = useState('cash_on_hand');
// // //     const [upiId, setUpiId] = useState('');
// // //     const [cardNo, setCardNo] = useState('');

// // //     const handleQuantityChange = async (itemId, newQuantity) => {
// // //         if (newQuantity < 1) return;
// // //         try {
// // //             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
// // //             window.location.reload();
// // //         } catch (err) {
// // //             console.error('Error updating quantity:', err.message);
// // //         }
// // //     };

// // //     const handleDelete = async (itemId) => {
// // //         try {
// // //             await axios.delete(`http://localhost:4000/single/product/${itemId}`);
// // //             window.location.reload();
// // //         } catch (error) {
// // //             console.log(error);
// // //         }
// // //     };

// // //     const ProductOrder = async () => {
// // //         try {
// // //             const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// // //             const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// // //             const orderData = {
// // //                 items: cartItems,
// // //                 totalValue,
// // //                 totalQuantity,
// // //                 customerName,
// // //                 customerPhoneNumber,
// // //                 paymentType,
// // //                 upiId: paymentType === 'upiId' ? upiId : '',
// // //                 cardNo: paymentType === 'cardNo' ? cardNo : ''
// // //             };

// // //             await axios.post('http://localhost:4000/order', orderData);
// // //             window.location.reload();
// // //         } catch (error) {
// // //             console.error(error);
// // //         }
// // //     };

// // //     return (
// // //         <div className="p-4 rounded-lg shadow-md text-black bg-white">
// // //         <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
// // //             <h1 className="text-2xl">Cart</h1>
// // //         </div>
// // //         <form className="mt-4 bg-slate-200 p-2">
// // //             <div className="space-y-4">
// // //                 {cartItems.map((item) => (
// // //                     <div className="flex justify-between items-center border-b pb-4" key={item._id}>
// // //                         <div className="flex flex-col">
// // //                             <h2 className="text-lg font-bold">{item.productName}</h2>
// // //                             <span className="flex gap-4">
// // //                                 <p className="text-sm">${item.productPrice.toFixed(2)}</p>
// // //                                 <p className="text-sm">IGST 18%</p>
// // //                             </span>
// // //                         </div>
// // //                         <div className="flex items-center flex-col">
// // //                             <div className='flex items-center'>
// // //                             <button className="bg-blue-500 text-white rounded px-2" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
// // //                             <span className="mx-2 font-bold">X{item.quantity}</span>
// // //                             <button className="bg-gray-500 text-white rounded px-2" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
// // //                         </div>

// // //                             <p className="ml-4">SKU: {item.sku}</p>
// // //                         </div>
// // //                         <div className="text-right flex items-center justify-start">
// // //                             <h1 className="text-xl font-bold">${(item.quantity * item.productPrice).toFixed(2)}</h1>
// // //                         </div>
// // //                         <button className="text-red-500 ml-2" onClick={() => handleDelete(item._id)}><MdDelete /></button>
// // //                     </div>
// // //                 ))}
// // //             </div>
    
// // //         <select className="mt-4 w-full p-2 border rounded" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
// // //             <option value="cash_on_hand">Cash on hand</option>
// // //             <option value="upiId">UPI ID</option>
// // //             <option value="cardNo">Card Number</option>
// // //         </select>
    
// // //         <div className="flex justify-between mt-4">
// // //             <h1 className="text-xl font-bold">Total</h1>
// // //             <h1 className="text-xl font-bold">${cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2)}</h1>
// // //         </div>
    
// // //         <div className="flex justify-between mt-4">
// // //             <ul>
// // //                 <li>CGST</li>
// // //                 <li>SGST</li>
// // //             </ul>
// // //             <ul>
// // //                 <li>Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</li>
// // //                 <li>Total items: {cartItems.length}</li>
// // //             </ul>
// // //         </div>
    
// // //         <div className="flex space-x-4 mt-4">
// // //             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={ProductOrder}>Cash F3</button>
// // //             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={ProductOrder}>Card F2</button>
// // //             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={ProductOrder}>UPI F4</button>
// // //         </div>
// // //         </form>
    
// // //         <div className="mt-4 bg-blue-500 p-5 text-white">
// // //             <div className="flex items-center mb-4">
// // //                 <label className="w-1/3">Customer name:</label>
// // //                 <input 
// // //                     value={customerName} 
// // //                     onChange={(e) => setCustomerName(e.target.value)} 
// // //                     placeholder='Customer name:' 
// // //                     className='w-2/3 p-2 border rounded' 
// // //                 />
// // //             </div>
// // //             <div className="flex items-center mb-4">
// // //                 <label className="w-1/3">Phone number:</label>
// // //                 <input 
// // //                     value={customerPhoneNumber} 
// // //                     onChange={(e) => setCustomerPhoneNumber(e.target.value)} 
// // //                     placeholder='Phone number:' 
// // //                     className='w-2/3 p-2 border rounded' 
// // //                 />
// // //             </div>
// // //             <div className="flex items-center mb-4">
// // //                 <label className="w-1/3">Address:</label>
// // //                 <textarea 
// // //                     placeholder='Address:' 
// // //                     rows={3} 
// // //                     className='w-2/3 p-2 border rounded' 
// // //                 />
// // //             </div>

// // //         </div>
// // //     </div>
    
    
// // //     );
// // // }

// // // export default Billcart;




// // 'use client';
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useAppContext } from '@/app/Context';
// // import { MdDelete } from "react-icons/md";

// // function Billcart() {
// //     const { cartItems } = useAppContext();
// //     const [customerName, setCustomerName] = useState('');
// //     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
// //     const [address, setAddress] = useState('');
// //     const [paymentType, setPaymentType] = useState('cash_on_hand');
// //     const [upiId, setUpiId] = useState('');
// //     const [cardNo, setCardNo] = useState('');

// //     const handleQuantityChange = async (itemId, newQuantity) => {
// //         if (newQuantity < 1) return;
// //         try {
// //             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
// //             window.location.reload();
// //         } catch (err) {
// //             console.error('Error updating quantity:', err.message);
// //         }
// //     };

// //     const handleDelete = async (itemId) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/single/product/${itemId}`);
// //             window.location.reload();
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     const ProductOrder = async () => {
// //         try {
// //             const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// //             const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

// //     const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
// //     const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// //     return (
// //         <div className="p-4 rounded-lg shadow-md text-black bg-white">
// //             <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
// //                 <h1 className="text-2xl">Cart</h1>
// //             </div>
// //             <form className="mt-4 bg-slate-200 p-4 space-y-4">
// //                 {/* Cart Items */}
// //                 <div className="space-y-4">
// //                     {cartItems.map((item) => (
// //                         <div key={item._id} className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
// //                             <div className="flex flex-col">
// //                                 <h2 className="text-lg font-bold">{item.productName}</h2>
// //                                 <span className="flex gap-4">
// //                                     <p className="text-sm">${item.productPrice.toFixed(2)}</p>
// //                                     <p className="text-sm">IGST 18%</p>
// //                                 </span>
// //                             </div>
// //                             <div className="flex items-center flex-col">
// //                                 <div className='flex items-center'>
// //                                     <button
// //                                         className="bg-blue-500 text-white rounded px-2"
// //                                         onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
// //                                     >
// //                                         +
// //                                     </button>
// //                                     <span className="mx-2 font-bold">X{item.quantity}</span>
// //                                     <button
// //                                         className="bg-gray-500 text-white rounded px-2"
// //                                         onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
// //                                     >
// //                                         -
// //                                     </button>
// //                                 </div>
// //                                 <p className="ml-4">SKU: {item.sku}</p>
// //                             </div>
// //                             <div>
// //                                 <MdDelete size={24} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Total Quantity and Price */}
// //                 <div className="flex flex-col md:flex-row justify-between mt-4">
// //                     <h1 className="text-xl font-bold">Total</h1>
// //                     <h1 className="text-xl font-bold">${totalValue}</h1>
// //                 </div>
// //                 <div className="flex flex-col md:flex-row justify-between mt-4">
// //                     <ul>
// //                         <li>CGST</li>
// //                         <li>SGST</li>
// //                     </ul>
// //                     <ul>
// //                         <li>Quantity: {totalQuantity}</li>
// //                         <li>Total items: {cartItems.length}</li>
// //                     </ul>
// //                 </div>

// //                 {/* Customer Info and Payment */}
// //                 <div className="mt-4 bg-blue-500 p-4 rounded text-white">
// //                     <div className="flex flex-col md:flex-row md:items-center mb-2">
// //                         <label className="font-bold w-full md:w-1/3" htmlFor="customerName">Customer Name:</label>
// //                         <input
// //                             type="text"
// //                             id="customerName"
// //                             value={customerName}
// //                             onChange={(e) => setCustomerName(e.target.value)}
// //                             className="border rounded p-2 w-full md:w-2/3"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="flex flex-col md:flex-row md:items-center mb-2">
// //                         <label className="font-bold w-full md:w-1/3" htmlFor="customerPhoneNumber">Customer Phone:</label>
// //                         <input
// //                             type="text"
// //                             id="customerPhoneNumber"
// //                             value={customerPhoneNumber}
// //                             onChange={(e) => setCustomerPhoneNumber(e.target.value)}
// //                             className="border rounded p-2 w-full md:w-2/3"
// //                             required
// //                         />
// //                     </div>

// //                     {/* Address Input */}
// //                     <div className="flex flex-col md:flex-row md:items-center mb-4">
// //                         <label className="w-full md:w-1/3 font-bold" htmlFor="address">Address:</label>
// //                         <textarea
// //                             id="address"
// //                             placeholder='Enter your address...'
// //                             rows={3}
// //                             value={address}
// //                             onChange={(e) => setAddress(e.target.value)}
// //                             className='w-full md:w-2/3 p-2 border rounded'
// //                             required
// //                         />
// //                     </div>

// //                     {/* Payment Method Buttons */}
// //                     <div className="flex flex-col md:flex-row md:items-center mb-4">
// //                         <div className="flex space-x-4 w-full md:w-2/3">
// //                             <button
// //                                 type="button"
// //                                 className={`p-2 w-full md:w-1/3 rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// //                                 onClick={() => setPaymentType('cash_on_hand')}
// //                             >
// //                                 Cash on Hand
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={`p-2 w-full md:w-1/3 rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// //                                 onClick={() => setPaymentType('upiId')}
// //                             >
// //                                 UPI ID
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={`p-2 w-full md:w-1/3 rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// //                                 onClick={() => setPaymentType('cardNo')}
// //                             >
// //                                 Card Number
// //                             </button>
// //                         </div>
// //                     </div>

// //                     {paymentType === 'upiId' && (
// //                         <div className="flex flex-col md:flex-row md:items-center mb-2">
// //                             <label className="font-bold w-full md:w-1/3">UPI ID:</label>
// //                             <input
// //                                 type="text"
// //                                 placeholder='Enter UPI ID'
// //                                 value={upiId}
// //                                 onChange={(e) => setUpiId(e.target.value)}
// //                                 className="border rounded p-2 w-full md:w-2/3"
// //                             />
// //                         </div>
// //                     )}
// //                     {paymentType === 'cardNo' && (
// //                         <div className="flex flex-col md:flex-row md:items-center mb-2">
// //                             <label className="font-bold w-full md:w-1/3">Card Number:</label>
// //                             <input
// //                                 type="text"
// //                                 placeholder='Enter Card Number'
// //                                 value={cardNo}
// //                                 onChange={(e) => setCardNo(e.target.value)}
// //                                 className="border rounded p-2 w-full md:w-2/3"
// //                             />
// //                         </div>
// //                     )}
// //                     <button
// //                         type="button"
// //                         onClick={ProductOrder}
// //                         className="bg-black text-white p-2 rounded mt-4 w-full"
// //                     >
// //                         Place Order
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
       
// // //         <div className="p-4 rounded-lg shadow-md text-black bg-white">
// // //     <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
// // //         <h1 className="text-xl sm:text-2xl">Cart</h1>
// // //     </div>
// // //     <form className="mt-4 bg-slate-200 p-4 space-y-4">
// // //         {/* Cart Items */}
// // //         <div className="space-y-4">
// // //             {cartItems.map((item) => (
// // //                  <div>
// // //                 <div key={item._id} className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
// // //                     <div className="flex flex-col">
// // //                         <h2 className="text-md sm:text-lg font-bold">{item.productName}</h2>
// // //                         <span className="flex gap-2">
// // //                             <p className="text-sm">${item.productPrice.toFixed(2)}</p>
// // //                             <p className="text-sm">IGST 18%</p>
// // //                         </span>
// // //                     </div>
// // //                     <div className="flex items-center flex-col">
// // //                         <div className='flex items-center'>
// // //                             <button
// // //                                 className="bg-blue-500 text-white rounded px-1 sm:px-2"
// // //                                 onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
// // //                             >
// // //                                 +
// // //                             </button>
// // //                             <span className="mx-1 font-bold">X{item.quantity}</span>
// // //                             <button
// // //                                 className="bg-gray-500 text-white rounded px-1 sm:px-2"
// // //                                 onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
// // //                             >
// // //                                 -
// // //                             </button>
// // //                         </div>
// // //                         <p className="ml-2 text-sm">SKU: {item.sku}</p>
// // //                     </div>
// // //                     <div>
// // //                         <MdDelete size={20} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
// // //                     </div>

// // //                 </div>
// // //         <hr className="w-full border border-slate-300" />

// // //                 </div>

// // //             ))}
// // //         </div>

// // //         {/* Total Quantity and Price */}
// // //         <div className="flex flex-col md:flex-row justify-between mt-4">
// // //             <h1 className="text-lg sm:text-xl font-bold">Total</h1>
// // //             <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
// // //         </div>
// // //         <div className="flex flex-col md:flex-row justify-between mt-4">
// // //             <ul className="text-sm">
// // //                 <li>CGST</li>
// // //                 <li>SGST</li>
// // //             </ul>
// // //             <ul className="text-sm">
// // //                 <li>Quantity: {totalQuantity}</li>
// // //                 <li>Total items: {cartItems.length}</li>
// // //             </ul>
// // //         </div>

// // //         {/* Customer Info and Payment */}
// // //         <div className="mt-4 bg-blue-500 p-4 rounded text-white">
// // //             <div className="flex flex-col md:flex-row md:items-center mb-2">
// // //                 <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerName">Customer Name:</label>
// // //                 <input
// // //                     type="text"
// // //                     id="customerName"
// // //                     value={customerName}
// // //                     onChange={(e) => setCustomerName(e.target.value)}
// // //                     className="border rounded p-2 w-full md:w-2/3 text-sm"
// // //                     required
// // //                 />
// // //             </div>
// // //             <div className="flex flex-col md:flex-row md:items-center mb-2">
// // //                 <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
// // //                 <input
// // //                     type="text"
// // //                     id="customerPhoneNumber"
// // //                     value={customerPhoneNumber}
// // //                     onChange={(e) => setCustomerPhoneNumber(e.target.value)}
// // //                     className="border rounded p-2 w-full md:w-2/3 text-sm"
// // //                     required
// // //                 />
// // //             </div>

// // //             {/* Address Input */}
// // //             <div className="flex flex-col md:flex-row md:items-center mb-4">
// // //                 <label className="w-full md:w-1/3 font-bold text-sm" htmlFor="address">Address:</label>
// // //                 <textarea
// // //                     id="address"
// // //                     placeholder='Enter your address...'
// // //                     rows={3}
// // //                     value={address}
// // //                     onChange={(e) => setAddress(e.target.value)}
// // //                     className='w-full md:w-2/3 p-2 border rounded text-sm'
// // //                     required
// // //                 />
// // //             </div>

// // //             {/* Payment Method Buttons */}
// // //             <div className="flex flex-col md:flex-row md:items-center mb-4">
// // //                 <div className="flex space-x-2 w-full md:w-2/3">
// // //                     <button
// // //                         type="button"
// // //                         className={`p-2 w-full rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// // //                         onClick={() => setPaymentType('cash_on_hand')}
// // //                     >
// // //                         Cash on Hand
// // //                     </button>
// // //                     <button
// // //                         type="button"
// // //                         className={`p-2 w-full rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// // //                         onClick={() => setPaymentType('upiId')}
// // //                     >
// // //                         UPI ID
// // //                     </button>
// // //                     <button
// // //                         type="button"
// // //                         className={`p-2 w-full rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
// // //                         onClick={() => setPaymentType('cardNo')}
// // //                     >
// // //                         Card Number
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {paymentType === 'upiId' && (
// // //                 <div className="flex flex-col md:flex-row md:items-center mb-2">
// // //                     <label className="font-bold w-full md:w-1/3 text-sm">UPI ID:</label>
// // //                     <input
// // //                         type="text"
// // //                         placeholder='Enter UPI ID'
// // //                         value={upiId}
// // //                         onChange={(e) => setUpiId(e.target.value)}
// // //                         className="border rounded p-2 w-full md:w-2/3 text-sm"
// // //                     />
// // //                 </div>
// // //             )}
// // //             {paymentType === 'cardNo' && (
// // //                 <div className="flex flex-col md:flex-row md:items-center mb-2">
// // //                     <label className="font-bold w-full md:w-1/3 text-sm">Card Number:</label>
// // //                     <input
// // //                         type="text"
// // //                         placeholder='Enter Card Number'
// // //                         value={cardNo}
// // //                         onChange={(e) => setCardNo(e.target.value)}
// // //                         className="border rounded p-2 w-full md:w-2/3 text-sm"
// // //                     />
// // //                 </div>
// // //             )}
// // //             <button
// // //                 type="button"
// // //                 onClick={ProductOrder}
// // //                 className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
// // //             >
// // //                 Place Order
// // //             </button>
// // //         </div>
// // //     </form>
// // // </div>

// //     );
// // }

// // export default Billcart;


// // Billcart.js
// 'use client'
// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import { useAppContext } from '@/app/Context';
// import { MdDelete } from "react-icons/md";

// function Billcart() {
//     const { cartItems, setCartItems } = useAppContext();
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [paymentType, setPaymentType] = useState('cash_on_hand');
//     const [upiId, setUpiId] = useState('');
//     const [cardNo, setCardNo] = useState('');

//     // Handle quantity change
//     const handleQuantityChange = useCallback(async (itemId, newQuantity) => {
//         if (newQuantity < 1) return;
//         try {
//             // Optimistically update state
//             setCartItems(prevItems =>
//                 prevItems.map(item =>
//                     item._id === itemId ? { ...item, quantity: newQuantity } : item
//                 )
//             );

//             await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity });
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

//     // Handle item deletion
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

//     // Calculate total value and quantity
//     const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
//     const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//     // Handle order placement
//     const handleOrderPlacement = async () => {
//         try {
//             const orderData = {
//                 items: cartItems,
//                 totalValue,
//                 totalQuantity,
//                 customerName,
//                 customerPhoneNumber,
//                 address,
//                 paymentType,
//                 upiId: paymentType === 'upiId' ? upiId : '',
//                 cardNo: paymentType === 'cardNo' ? cardNo : ''
//             };

//             await axios.post('http://localhost:4000/order', orderData);
//             setCartItems([]); // Clear the cart after placing the order
//             setCustomerName('');
//             setCustomerPhoneNumber('');
//             setAddress('');
//         } catch (error) {
//             console.error('Error placing order:', error);
//         }
//     };

//     return (
//         <div className="p-4 rounded-lg shadow-md text-black bg-white">
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
//                                     </span>
//                                 </div>
//                                 <div className="flex items-center flex-col">
//                                     <div className='flex items-center'>
//                                         <button
//                                             type="button"
//                                             className="bg-blue-500 text-white rounded px-1 sm:px-2"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                                         >
//                                             +
//                                         </button>
//                                         <span className="mx-1 font-bold">X{item.quantity}</span>
//                                         <button
//                                             type="button"
//                                             className="bg-gray-500 text-white rounded px-1 sm:px-2"
//                                             onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
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
//                     {/* Customer info inputs here... */}
//                     <button
//                         type="button"
//                         onClick={handleOrderPlacement}
//                         className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
//                     >
//                         Place Order
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Billcart;








'use client';
import React, { useState,useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/app/Context';
import { MdDelete } from "react-icons/md";

function Billcart() {
    const { cartItems,setCartItems } = useAppContext();
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


    const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 rounded-lg  text-black bg-white">
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
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                        <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerName">Customer Name:</label>
                        <input
                            type="text"
                            placeholder='Enter Customer Name :'
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
                            type="tel" // Changed to 'tel' for better mobile handling
                            id="customerPhoneNumber"
                            value={customerPhoneNumber}
                            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                            className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
                            required
                        />
                    </div>

                    {/* Address Input */}
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

                    {/* Payment Method Buttons */}
                    <div className="flex flex-col items-center justify-start md:flex-row md:items-center mb-4 ">
                        <div className="gap-5 flex space-x-2 w-full md:w-2/3 items-center">
                            <button
                                type="button"
                                className={`p-2 w-full rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                                onClick={() => setPaymentType('cash_on_hand')}
                            >
                                Cash on Hand
                            </button>
                            <button
                                type="button"
                                className={`p-2 w-full rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                                onClick={() => setPaymentType('upiId')}
                            >
                                UPI ID
                            </button>
                            <button
                                type="button"
                                className={`p-2 w-full rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                                onClick={() => setPaymentType('cardNo')}
                            >
                                Card Number
                            </button>
                        </div>
                    </div>

                    {paymentType === 'upiId' && (
                        <div className="flex flex-col md:flex-row md:items-center mb-2">
                            <label className="font-bold w-full md:w-1/3 text-sm">UPI ID:</label>
                            <input
                                type="text"
                                placeholder='Enter UPI ID'
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="border rounded p-2 w-full md:w-2/3 text-sm"
                            />
                        </div>
                    )}
                    {paymentType === 'cardNo' && (
                        <div className="flex flex-col md:flex-row md:items-center mb-2">
                            <label className="font-bold w-full md:w-1/3 text-sm">Card Number:</label>
                            <input
                                type="text"
                                placeholder='Enter Card Number'
                                value={cardNo}
                                onChange={(e) => setCardNo(e.target.value)}
                                className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
                            />
                        </div>
                    )}
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

