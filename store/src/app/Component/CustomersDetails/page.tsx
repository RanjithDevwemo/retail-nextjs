// // // // 'use client'
// // // // import { useAppContext } from "@/app/Context";

// // // // export default function CustomersDetail() {
// // // //   const { getAllOrders } = useAppContext();

// // // //   // Extract order data
// // // //   const data = getAllOrders.message;

// // // //   console.log(data);
  
// // // //   // Object to hold unique customers
// // // //   const uniqueCustomers = {};
// // // //   const filteredCustomers = [];

// // // //   // Loop through the orders to filter unique customers
  
// // // //   data.forEach(order => {
// // // //     const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;
    
// // // //     if (!uniqueCustomers[customerKey]) {
// // // //       uniqueCustomers[customerKey] = true;
// // // //       filteredCustomers.push({
// // // //         customerName: order.customerName,
// // // //         customerPhoneNumber: order.customerPhoneNumber
// // // //       });
// // // //     }
// // // //   });

// // // //   return (
// // // //     <div>
// // // //       <h1>Customers Detail</h1>
// // // //       {filteredCustomers.length === 0 ? (
// // // //         <p>No customers found.</p>
// // // //       ) : (
// // // //         <ul>
// // // //           {filteredCustomers.map((customer, index) => (
// // // //             <li key={index}>
// // // //               {customer.customerName} - {customer.customerPhoneNumber}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }




// // // 'use client'
// // // import { useEffect, useState } from "react";
// // // import { useAppContext } from "@/app/Context";

// // // export default function CustomersDetail() {
// // //   const { getAllOrders } = useAppContext();
// // //   const [filteredCustomers, setFilteredCustomers] = useState([]);

// // //   useEffect(() => {
// // //     const data = getAllOrders.message || [];
// // //     const uniqueCustomers = {};

// // //     // Filter unique customers
// // //     data.forEach(order => {
// // //       const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

// // //       if (!uniqueCustomers[customerKey]) {
// // //         uniqueCustomers[customerKey] = true;
// // //         setFilteredCustomers(prev => [
// // //           ...prev,
// // //           {
// // //             customerName: order.customerName,
// // //             customerPhoneNumber: order.customerPhoneNumber
// // //           }
// // //         ]);
// // //       }
// // //     });
// // //   }, [getAllOrders.message]); // Run effect when order data changes

// // //   return (
// // //     <div>
// // //       <h1>Customers Detail</h1>
// // //       {filteredCustomers.length === 0 ? (
// // //         <p>No customers found.</p>
// // //       ) : (
// // //         <ul>
// // //           {filteredCustomers.map((customer, index) => (
// // //             <li key={index}>
// // //               {customer.customerName} - {customer.customerPhoneNumber}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // }



// // 'use client';
// // import { useEffect, useState } from "react";
// // import { useAppContext } from "@/app/Context";

// // export default function CustomersDetail() {
// //   const { getAllOrders } = useAppContext();
// //   const [filteredCustomers, setFilteredCustomers] = useState([]);

// //   useEffect(() => {
// //     const data = getAllOrders.message || [];
// //     const uniqueCustomers = new Set();          //set used for creating unique value
// //     const customersArray = [];

// //     // Filter unique customers based on name and phone number
// //     data.forEach(order => {
// //       const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

// //       console.log(customerKey);
      

// //       if (!uniqueCustomers.has(customerKey)) {      //the Has method used to check if a specific element exists in a Set is the has() method
// //         uniqueCustomers.add(customerKey);
// //         console.log(uniqueCustomers);
        
// //         customersArray.push({
// //           customerName: order.customerName,
// //           customerPhoneNumber: order.customerPhoneNumber
// //         });
// //       }
// //     });

// //     // Set the unique customers array to state
// //     setFilteredCustomers(customersArray);
// //   }, [getAllOrders.message]); // Run effect when order data changes

// //   return (
// //     <div className="bg-blue-600 flex items-center justify-center text-white flex-col h-screen">
// //       <h1>Customers Detail</h1>
// //       {filteredCustomers.length === 0 ? (
// //         <p>No customers found.</p>
// //       ) : (
// //         <ul>
// //           {filteredCustomers.map((customer, index) => (
// //             <li key={index}>
// //               {customer.customerName} - {customer.customerPhoneNumber}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }








// 'use client';
// import { useEffect, useState } from "react";
// import { useAppContext } from "@/app/Context";

// export default function CustomersDetail() {
//   const { getAllOrders } = useAppContext();
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);

//   useEffect(() => {
//     const data = getAllOrders.message || [];
//     const uniqueCustomers = new Set();
//     const customersArray = [];

//     // Filter unique customers based on name and phone number
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
//           ) // Collect all orders for this customer
//         });
//       }
//     });

//     // Set the unique customers array to state
//     setFilteredCustomers(customersArray);
//   }, [getAllOrders.message]);

//   const handleViewAll = (orders) => {
//     setSelectedCustomerOrders(orders);
//   };

//   const handleCloseDetails = () => {
//     setSelectedCustomerOrders(null);
//   };

//   return (
//     <div className="bg-blue-600 flex items-center justify-center text-white flex-col h-screen">
//       <h1>Customers Detail</h1>
//       {filteredCustomers.length === 0 ? (
//         <p>No customers found.</p>
//       ) : (
//         <ul>
//           {filteredCustomers.map((customer, index) => (
//             <li key={index} className="mb-2">
//               {customer.customerName} - {customer.customerPhoneNumber}
//               <button 
//                 onClick={() => handleViewAll(customer.orders)} 
//                 className="ml-4 bg-white text-blue-600 rounded px-2 py-1"
//               >
//                 View All
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedCustomerOrders && (
//         <div className="mt-4 bg-white text-black p-4 rounded">
//           <h2 className="text-xl mb-2">Purchase Details</h2>
//           <button 
//             onClick={handleCloseDetails} 
//             className="mb-2 bg-red-500 text-white rounded px-2 py-1"
//           >
//             Close
//           </button>
//           <ul>
//             {selectedCustomerOrders.map((order) => (
//               <li key={order._id} className="mb-1">
//                 Order ID: {order._id}, Total Value: ${order.totalValue.toFixed(2)}, Date: {new Date(order.createdAt).toLocaleDateString()}
//                 <ul className="ml-4">
//                   {order.items.map((item, index) => (
//                     <li key={item._id || index}>
//                       Product Name: {item.productName || 'N/A'}, Price: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Quantity: {item.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }



'use client'; 

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/app/Context";
// import { useAppContext } from "@/app/Context"; 

export default function CustomersDetail() {
  const { getAllOrders } = useAppContext();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = getAllOrders.message || [];
    const uniqueCustomers = new Set();
    const customersArray = [];

    // Filter unique customers based on name and phone number
    data.forEach(order => {
      const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

      if (!uniqueCustomers.has(customerKey)) {
        uniqueCustomers.add(customerKey);
        
        customersArray.push({
          customerName: order.customerName,
          customerPhoneNumber: order.customerPhoneNumber,
          orders: data.filter(o => 
            o.customerName === order.customerName && 
            o.customerPhoneNumber === order.customerPhoneNumber
          ) // Collect all orders for this customer
        });
      }
    });

    // Set the unique customers array to state
    setFilteredCustomers(customersArray);
  }, [getAllOrders.message]);

  const handleViewAll = (customerPhoneNumber) => {
    // Navigate to dynamic customer orders page using customerPhoneNumber
    router.push(`/customers/${customerPhoneNumber}`);
  };

  return (
    <div className="bg-blue-600 flex items-center justify-center text-white flex-col h-screen">
      <h1>Customers Detail</h1>
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {filteredCustomers.map((customer, index) => (
            <li key={index} className="mb-2">
              {customer.customerName} - {customer.customerPhoneNumber}
              <button 
                onClick={() => handleViewAll(customer.customerPhoneNumber)} 
                className="ml-4 bg-white text-blue-600 rounded px-2 py-1"
              >
                View All
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
