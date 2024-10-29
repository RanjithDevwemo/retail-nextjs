// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderList = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const statuses = ['Pending', 'Completed', 'Cancelled', 'WIP'];

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/order');
//                 if (response.data.success) {
//                     setOrders(response.data.message);
//                 } else {
//                     setError(response.data.message);
//                 }
//             } catch (err) {
//                 setError('Error fetching orders.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const updateStatus = async (orderId, newStatus) => {
//         try {
//             const response = await axios.patch(`http://localhost:4000/api/order/${orderId}`, { status: newStatus });
//             if (response.data.success) {
//                 setOrders(prevOrders =>
//                     prevOrders.map(order =>
//                         order._id === orderId ? { ...order, status: newStatus } : order
//                     )
//                 );
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (err) {
//             alert('Error updating status.');
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-4">Orders</h1>
//             <div>
//                 {orders.map(order => (
//                     <div key={order._id} className="border p-4 rounded-lg shadow-md mb-4">
//                         <h2 className="text-xl font-semibold">{order.username}</h2>
//                         <p>Phone: {order.phoneNumber}</p>
//                         <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
//                         <p>Status: 
//                             <select
//                                 value={order.status}
//                                 onChange={(e) => updateStatus(order._id, e.target.value)}
//                                 className="ml-2 border border-gray-300 rounded"
//                             >
//                                 {statuses.map(status => (
//                                     <option key={status} value={status}>
//                                         {status}
//                                     </option>
//                                 ))}
//                             </select>
//                         </p>
//                         <h3 className="font-semibold">Items:</h3>
//                         <ul>
//                             {order.cartItems.map(item => (
//                                 <li key={item._id}>
//                                     {item.ItemName} - Quantity: {item.quantity}, Amount: ${item.amount}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default OrderList;



'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const statuses = ['Pending', 'Completed', 'Cancelled', 'WIP'];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/order');
                if (response.data.success) {
                    setOrders(response.data.message);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/order/${orderId}`, { status: newStatus });
            if (response.data.success) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            alert('Error updating status.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500';
            case 'Completed':
                return 'bg-green-600 text-white';
            case 'Cancelled':
                return 'bg-red-600';
            case 'WIP':
                return 'bg-green-200';
            default:
                return 'bg-white'; 
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div>
                {orders.map(order => (
                    <div key={order._id} className="border p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-semibold">{order.username}</h2>
                        <p>Phone: {order.phoneNumber}</p>
                        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                        <p>Status: 
                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                className={`ml-2 border border-gray-300 rounded ${getStatusColor(order.status)}`}
                            >
                                {statuses.map(status => (
                                    <option className='bg-white text-black' key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <h3 className="font-semibold">Items:</h3>
                        <ul>
                            {order.cartItems.map(item => (
                                <li key={item._id}>
                                    {item.ItemName} - Quantity: {item.quantity}, Amount: ${item.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
