
'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context/index';

export default function AllOrder() {
    const { getAllOrders } = useAppContext();
    const orders = getAllOrders?.message || [];
    const [filter, setFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // Change this to adjust the number of orders per page

    useEffect(() => {
        filterOrders();
    }, [filter, dateFilter, orders]);

    const filterOrders = () => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const filtered = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const isWithinDateRange =
                (dateFilter === 'all') ||
                (dateFilter === 'today' && orderDate.toDateString() === today.toDateString()) ||
                (dateFilter === 'last7' && orderDate >= sevenDaysAgo);

            const customerName = order.customerName.toLowerCase();
            const customerPhoneNumber = order.customerPhoneNumber.toLowerCase();
            const matchesFilter =
                customerName.includes(filter.toLowerCase()) ||
                customerPhoneNumber.includes(filter.toLowerCase());

            return isWithinDateRange && matchesFilter;
        });

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    const totalOrders = filteredOrders.length;
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

    const totalAmount = currentOrders.reduce((sum, order) => sum + order.totalValue, 0).toFixed(2);
    const totalCustomers = new Set(currentOrders.map(order => order.customerName)).size;
    const totalSoldProducts = currentOrders.reduce((sum, order) => sum + order.totalQuantity, 0);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Get All Customers Orders</h1>
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder='Filter by Customer Name or Phone Number'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
                />
                <button
                    onClick={filterOrders}
                    className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 transition"
                >
                    Submit
                </button>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 ml-2"
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="last7">Last 7 Days</option>
                </select>
            </div>

            <div className="mb-4">
                <p>Total Amount: ${totalAmount}</p>
                <p>Total Customers: {totalCustomers}</p>
                <p>Total Sold Products: {totalSoldProducts}</p>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border-b border-gray-300 px-4 py-2">Items</th>
                        <th className="border-b border-gray-300 px-4 py-2">Total Value</th>
                        <th className="border-b border-gray-300 px-4 py-2">Total Quantity</th>
                        <th className="border-b border-gray-300 px-4 py-2">Customer Name</th>
                        <th className="border-b border-gray-300 px-4 py-2">Customer Phone Number</th>
                        <th className="border-b border-gray-300 px-4 py-2">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">No orders found.</td>
                        </tr>
                    ) : (
                        currentOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="border-b border-gray-300 px-4 py-2">
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={item._id || index}>
                                                Product Name: {item.productName || 'N/A'},
                                                Product Price: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'},
                                                Quantity: {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">${order.totalValue.toFixed(2)}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.totalQuantity}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.customerName}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.customerPhoneNumber}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}









// 'use client';
// // import { useAppContext } from "@/app/Context";
// import { useAppContext } from '../../Context/index';

// import { useEffect, useState } from "react";

// export default function CustomersDetail() {
//   const { getAllOrders } = useAppContext();

//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);
//   const [selectedCustomerName, setSelectedCustomerName] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const customersPerPage = 8;

//   useEffect(() => {
//     const data = getAllOrders.message || [];
//     const uniqueCustomers = new Set();
//     const customersArray = [];

//     data.forEach(order => {
//       const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

//       if (!uniqueCustomers.has(customerKey)) {
//         uniqueCustomers.add(customerKey);
        
//         customersArray.push({
//           customerName: order.customerName,
//           customerPhoneNumber: order.customerPhoneNumber,
//           orders: data.filter(o => 
//             o.customerName === order.customerName && 
//             o.customerPhoneNumber === order.customerPhoneNumber
//           )
//         });
//       }
//     });

//     setFilteredCustomers(customersArray);
//   }, [getAllOrders.message]);

//   const handleViewAll = (orders, customerName) => {
//     setSelectedCustomerOrders(orders);
//     setSelectedCustomerName(customerName);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setCurrentPage(1); // Reset to the first page when searching
//   };

//   const filteredResults = filteredCustomers.filter(customer => 
//     customer.customerName.toLowerCase().includes(searchTerm)
//   );

//   // Pagination logic
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredResults.slice(indexOfFirstCustomer, indexOfLastCustomer);
//   const totalPages = Math.ceil(filteredResults.length / customersPerPage);

//   return (
//     <div className="flex h-screen">
//       {selectedCustomerOrders ? (
//         <div className="flex-1 bg-gray-100 p-4">
//           <div className="bg-white text-black p-4 rounded">
//             <div className="flex items-center justify-between">
//             <h2 className="text-2xl mb-2">Purchase Details</h2>
//             <h1 className="text-2xl mb-2">Customer Name : {selectedCustomerName}</h1>
//             </div>
//             <button 
//               onClick={() => {
//                 setSelectedCustomerOrders(null);
//                 setSelectedCustomerName('');
//               }} 
//               className="mb-2 bg-red-500 text-white rounded px-2 py-1"
//             >
//               Back to Customers
//             </button>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2">S.No</th>
//                   {/* <th className="py-2">Order ID</th> */}
//                   <th className="py-2">Items</th>
//                   <th className="py-2">Total Value</th>
//                   <th className="py-2">Date</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedCustomerOrders.map((order, index) => (
//                   <tr key={order._id} className="border-b">
//                     <td className="py-2">{index + 1}</td>
//                     {/* <td className="py-2">{order._id}</td> */}
//                     <td className="py-2">
//                       <ul className="list-disc list-inside">
//                         {order.items.map((item, index) => (
//                           <li key={item._id || index}>
//                             {item.productName || 'N/A'}: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Qty: {item.quantity}
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                     <td className="py-2">${order.totalValue.toFixed(2)}</td>

//                     <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col w-full bg-blue-600 text-white p-4">
//           <h1 className="text-2xl mb-4">Customers Detail</h1>
//           <input
//             type="text"
//             placeholder="Search Customer Name"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="mb-4 p-2 rounded"
//           />
//           {filteredResults.length === 0 ? (
//             <p>No customers found.</p>
//           ) : (
//             <>
//               <table className="w-full text-left mb-4">
//                 <thead>
//                   <tr>
//                     <th className="py-2">S.No</th>
//                     <th className="py-2">Customer Name</th>
//                     <th className="py-2">Phone Number</th>
//                     <th className="py-2">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCustomers.map((customer, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="py-2">{index + indexOfFirstCustomer + 1}</td>
//                       <td className="py-2">{customer.customerName}</td>
//                       <td className="py-2">{customer.customerPhoneNumber}</td>
//                       <td className="py-2">
//                         <button 
//                           onClick={() => handleViewAll(customer.orders, customer.customerName)} 
//                           className="bg-white text-blue-600 rounded px-2 py-1"
//                         >
//                           View All
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="flex justify-between mt-4">
//                 <button 
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="bg-blue-500 text-white rounded px-4 py-2"
//                 >
//                   Previous
//                 </button>
//                 <span>{`Page ${currentPage} of ${totalPages}`}</span>
//                 <button 
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="bg-blue-500 text-white rounded px-4 py-2"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
