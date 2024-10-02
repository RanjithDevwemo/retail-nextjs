// // // // import React from 'react'
// // // // import '@/app/Component/AllOrderProducts/AllOrderProducts.css'
// // // // export default function AllOrderProducts() {
// // // //   return (
// // // //     <div className='al'>
  
// // // //     </div>
// // // //   )
// // // // }


// // // 'use client'
// // // import '@/app/Component/AllOrderProducts/AllOrderProducts.css'
// // // import { useAppContext } from '@/app/Context';
// // // // import FindBillByPhoneNumber from "../SingleCustomerBill/SingleCustomerBill"
// // // function Products() {
// // //     const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();
    

// // //     // Handle adding product to the bill
// // //     const handleCardClick = (product) => {
// // //         console.log("product page : ",product.reorderPoint);
        
// // //         if(product.stock>0){
// // //         billCart(
// // //             product._id,
// // //             product.name,
// // //             product.finalPrice,
// // //             product.category,
// // //             product.gst,
// // //             product.reorderPoint,
// // //             product.sku
// // //         );
// // //     }else{
// // //         alert("out of stock cannot order this product")
// // //     }
// // //     };
    
// // //     return (
// // //         <div className="products">
// // //             <h1>Order Products</h1>
// // //             <form>
// // //                 <input
// // //                     type="text"
// // //                     placeholder='Search products...'
// // //                     value={searchTerm}
// // //                     onChange={handleSearchChange}
// // //                 />
// // //             </form>
// // //             <div className="product-grid">
// // //                 {filteredProducts.length === 0 ? (
// // //                     <p>No products found</p>
// // //                 ) : (
// // //                     filteredProducts.map(product => (
// // //                         <div
// // //                             key={product._id}
// // //                             className="product-card"
// // //                             onClick={() => handleCardClick(product)}
// // //                         >
// // //                             <img src={product.image} alt={product.name} className="product-image" />
// // //                             <h2 className="product-name">{product.name}</h2>
// // //                             <p className="product-category">Category: {product.category}</p>
// // //                             <p className="product-description">SKU: {product.sku}</p>
// // //                             <p className="product-price">Price: ${product.finalPrice.toFixed(2)}</p>
// // //                             <p className="product-stock">Stock: {product.stock}</p>
// // //                             <p className="product-gst">GST: {product.gst}%</p>
// // //                             <p>reorderPoint : {product.reorderPoint}</p>
// // //                         </div>
// // //                     ))
// // //                 )}
// // //             </div>
// // //             {/* <FindBillByPhoneNumber />       */}
// // //         </div>
// // //     );
// // // }

// // // export default Products;




// // // import React from 'react'
// // // import '@/app/Component/AllOrderProducts/AllOrderProducts.css'
// // // export default function AllOrderProducts() {
// // //   return (
// // //     <div className='al'>
  
// // //     </div>
// // //   )
// // // }



// // 'use client'
// // import '@/app/Component/AllOrderProducts/AllOrderProducts.css'
// // import { useAppContext } from '@/app/Context';
// // import Image from 'next/image';

// // // import FindBillByPhoneNumber from "../SingleCustomerBill/SingleCustomerBill"
// // function Products() {
// //     const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();
    

// //     // Handle adding product to the bill
// //     const handleCardClick = (product) => {
// //         console.log("product page : ",product.reorderPoint);
        
// //         if(product.stock>0){
// //         billCart(
// //             product._id,
// //             product.name,
// //             product.finalPrice,
// //             product.category,
// //             product.gst,
// //             product.reorderPoint,
// //             product.sku
// //         );
// //     }else{
// //         alert("out of stock cannot order this product")
// //     }
// //     };
    
// //     return (
// //         <div className="products">
// //             <h1>Order Products</h1>
// //             <form>
// //                 <input
// //                     type="text"
// //                     placeholder='Search products...'
// //                     value={searchTerm}
// //                     onChange={handleSearchChange}
// //                 />
// //             </form>
// //             <div className="product-grid">
// //                 {filteredProducts.length === 0 ? (
// //                     <p>No products found</p>
// //                 ) : (
// //                     filteredProducts.map(product => (
// //                         <div
// //                             key={product._id}
// //                             className="product-card"
// //                             onClick={() => handleCardClick(product)}
// //                         >
// //                             <Image src={product.image} alt={product.name} width={160} height={130} className="product-image" />
// //                             <div className='product-name'>
// //                             <h4 >{product.name}</h4>
// //                             </div>
// //                             {/* <p className="product-category">Category: {product.category}</p>
// //                             <p className="product-description">SKU: {product.sku}</p>
// //                             <p className="product-price">Price: ${product.finalPrice.toFixed(2)}</p>
// //                             <p className="product-stock">Stock: {product.stock}</p>
// //                             <p className="product-gst">GST: {product.gst}%</p>
// //                             <p>reorderPoint : {product.reorderPoint}</p> */}
// //                         </div>
// //                     ))
// //                 )}
// //             </div>
// //             {/* <FindBillByPhoneNumber />       */}
// //         </div>
// //     );
// // }

// // export default Products;



// 'use client';
// import '@/app/Component/AllOrderProducts/AllOrderProducts.css';
// import { useAppContext } from '@/app/Context';
// import Image from 'next/image';

// function Products() {
//     const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();

//     const handleCardClick = (product) => {
//         if (product.stock > 0) {
//             billCart(
//                 product._id,
//                 product.name,
//                 product.finalPrice,
//                 product.category,
//                 product.gst,
//                 product.reorderPoint,
//                 product.sku
//             );
//         } else {
//             alert("Out of stock, cannot order this product");
//         }
//     };

//     return (
//         <div className="p-4 h-screen flex flex-col">
//             <h1 className="text-2xl font-bold text-center mb-4">Order Products</h1>
//             <form className="mb-4">
//                 <input
//                     type="text"
//                     placeholder='Search products...'
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full p-2 border rounded"
//                 />
//             </form>
//             <div className="flex-grow  h-0 overflow-y-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//                     {filteredProducts.length === 0 ? (
//                         <p className="text-center col-span-full">No products found</p>
//                     ) : (
//                         filteredProducts.map(product => (
//                             <div
//                                 key={product._id}
//                                 className="border rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
//                                 onClick={() => handleCardClick(product)}
//                             >
//                                 <Image src={product.image} alt={product.name} width={160} height={130} className="w-full h-40 object-cover" />
//                                 <div className='bg-blue-600 text-white text-center p-2'>
//                                     <h4 className="text-lg">{product.name}</h4>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;

'use client';
import '@/app/Component/AllOrderProducts/AllOrderProducts.css';
import { useAppContext } from '@/app/Context';
import Image from 'next/image';
import { useState } from 'react';

function Products() {
    const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

    const handleCardClick = (product) => {
        if (product.stock > 0) {
            billCart(
                product._id,
                product.name,
                product.finalPrice,
                product.category,
                product.gst,
                product.reorderPoint,
                product.sku
            );
        } else {
            alert("Out of stock, cannot order this product");
        }
    };

    // Function to sort products based on the selected order
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
        } else if (sortOrder === 'lowToHigh') {
            return a.finalPrice - b.finalPrice;
        } else if (sortOrder === 'highToLow') {
            return b.finalPrice - a.finalPrice;
        }
    });

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="p-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center mb-4">Order Products</h1>
            <form className="mb-4">
                <input
                    type="text"
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded"
                />
            </form>
            <div className="mb-4 text-end">
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="p-2 border rounded cursor-pointer w-full sm:w-auto"
                >
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                    <option value="lowToHigh">Low Price to High</option>
                    <option value="highToLow">High Price to Low</option>
                </select>
            </div>
            <div className="flex-grow h-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {sortedProducts.length === 0 ? (
                        <p className="text-center col-span-full">No products found</p>
                    ) : (
                        sortedProducts.map(product => (
                            <div
                                key={product._id}
                                className="border rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
                                onClick={() => handleCardClick(product)}
                            >
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    width={160} 
                                    height={130} 
                                    className="w-full h-40 object-cover" 
                                />
                                <div className='bg-blue-600 text-white text-center p-2'>
                                    <h4 className="text-lg">{product.name}</h4>
                                    <p className="product-price">${product.finalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
