// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// function BillConfirm() {
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [cartItems, setCartItems] = useState([]);
//     const [paymentType, setPaymentType] = useState('cash_on_hand');
//     const [upiId, setUpiId] = useState('');
//     const [cardNo, setCardNo] = useState('');
//     const router = useRouter();
//     const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
//     const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);

//         setCustomerName(urlParams.get('customerName') || '');
//         setCustomerPhoneNumber(urlParams.get('customerPhoneNumber') || '');
//         setAddress(urlParams.get('address') || '');

//         const items = urlParams.get('cartItems');
//         if (items) {
//             const parsedItems = JSON.parse(decodeURIComponent(items));
//             setCartItems(parsedItems);
//         }
//     }, []);

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

//             if(cardNo.length>0  || upiId.length>0){
//            const val= await axios.post('http://localhost:4000/order', orderData);
//             alert(val.data.message);
//             window.location.reload(); 
//             router.push("/Pages/DashBoard");
//             }else{
//                 alert("Please enter any single payment options");
//             }
//             // Refresh the page after placing the order
//         } catch (error) {
//             console.error('Error placing order:', error);
//         }
//     };

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

//                 {/* Payment Method Selection */}
//                 <div className="mt-4">
//                     <h2 className="font-bold text-white">Payment Method:</h2>
//                     <button type="button" onClick={() => setPaymentType('cash_on_hand')} className={`p-2 ${paymentType === 'cash_on_hand' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>Cash on Hand</button>
//                     <button type="button" onClick={() => setPaymentType('upiId')} className={`p-2 ${paymentType === 'upiId' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>UPI ID</button>
//                     <button type="button" onClick={() => setPaymentType('cardNo')} className={`p-2 ${paymentType === 'cardNo' ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded`}>Card Number</button>

//                     {paymentType === 'upiId' && (
//                         <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID" className="border rounded p-2 w-full mt-2" />
//                     )}
//                     {paymentType === 'cardNo' && (
//                         <input type="text" value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="Enter Card Number" className="border rounded p-2 w-full mt-2" />
//                     )}
//                 </div>

//                 {/* Place Order Button */}
//                 <button type="button" onClick={handleOrderPlacement} className="bg-green-500 text-white p-2 rounded mt-4 w-full">Place Order</button>
//             </form>
//         </div>
//     );
// }

// export default BillConfirm;






'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function BillConfirm() {
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [paymentType, setPaymentType] = useState('cash_on_hand');
    const [upiId, setUpiId] = useState('');
    const [cardNo, setCardNo] = useState('');
    const router = useRouter();

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
        // Validate that exactly one payment option is selected and valid
        const isCashOnHand = paymentType === 'cash_on_hand';
        const isValidUpi = paymentType === 'upiId' && upiId.length > 0;
        const isValidCard = paymentType === 'cardNo' && cardNo.length > 0;

        if (isCashOnHand || isValidUpi || isValidCard) {
            try {
                const orderData = {
                    items: cartItems,
                    totalValue,
                    totalQuantity,
                    customerName,
                    customerPhoneNumber,
                    address,
                    paymentType,
                    upiId: isValidUpi ? upiId : '',
                    cardNo: isValidCard ? cardNo : ''
                };
console.log("upiId : ",upiId);
console.log("cardNo : ",cardNo);

if(upiId.length>0||cardNo.length>0){
                const response = await axios.post('http://localhost:4000/order', orderData);
                alert(response.data.message);
                router.push("/Pages/DashBoard"); // Navigate to Dashboard
                window.location.reload(); 
}else{
    alert("plaese enter any one payment method");
}
            } catch (error) {
                console.error('Error placing order:', error);
                alert("There was an error placing your order. Please try again.");
            }
        } else {
            alert("Please select a payment method and enter the required information.");
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
