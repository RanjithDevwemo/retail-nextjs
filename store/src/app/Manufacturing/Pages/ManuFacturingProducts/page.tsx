// // // 'use client';
// // // import { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const ManufacturingProductList = () => {
// // //     const [products, setProducts] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     useEffect(() => {
// // //         const fetchProducts = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:4000/api/manufacturingAdd');
// // //                 if (response.data.success) {
// // //                     setProducts(response.data.data); 
// // //                 } else {
// // //                     setError(response.data.message);
// // //                 }
// // //             } catch (err) {
// // //                 setError('Error fetching products.');
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchProducts();
// // //     }, []);

// // //     if (loading) return <div>Loading...</div>;
// // //     if (error) return <div>{error}</div>;

// // //     return (
// // //         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
// // //             <h1 className="text-2xl font-bold mb-4">Manufacturing Products</h1>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                 {products.map((product) => (
// // //                     <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
// // //                         <h2 className="text-xl font-semibold">{product.ItemName}</h2>
// // //                         <p className="text-gray-700">Stock: {product.stock}</p>
// // //                         <p className="text-gray-700">Amount: ${product.amount}</p>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default ManufacturingProductList;





// // 'use client';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const ManufacturingProductList = () => {
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchProducts = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:4000/api/manufacturingAdd');
// //                 if (response.data.success) {
// //                     setProducts(response.data.data);
// //                 } else {
// //                     setError(response.data.message);
// //                 }
// //             } catch (err) {
// //                 setError('Error fetching products.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchProducts();
// //     }, []);

// //     const addToCart = async (product) => {
// //         try {
// //             const response = await axios.post('http://localhost:4000/api/cart', {
// //                 productId: product._id,
// //                 ItemName: product.ItemName,
// //                 stock: product.stock,
// //                 amount: product.amount
// //             });

// //             if (response.data.success) {
// //                 alert('Item added to cart successfully!');
// //             } else {
// //                 alert(response.data.message);
// //             }
// //         } catch (error) {
// //             alert('Error adding item to cart.');
// //         }
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (error) return <div>{error}</div>;

// //     return (
// //         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
// //             <h1 className="text-2xl font-bold mb-4">Manufacturing Products Add to cart</h1>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                 {products.map((product) => (
// //                     <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
// //                         <h2 className="text-xl font-semibold">{product.ItemName}</h2>
// //                         <p className="text-gray-700">Stock: {product.stock}</p>
// //                         <p className="text-gray-700">Amount: ${product.amount}</p>
// //                         <button
// //                             onClick={() => addToCart(product)}
// //                             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
// //                         >
// //                             Add to Cart
// //                         </button>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ManufacturingProductList;




// 'use client';
// import { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';

// const ManufacturingProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/manufacturingAdd');
//                 if (response.data.success) {
//                     setProducts(response.data.data);
//                 } else {
//                     setError(response.data.message);
//                 }
//             } catch (err) {
//                 setError('Error fetching products.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const addToCart = useCallback((product) => {
//         setCartItems(prevItems => {
//             const existingItem = prevItems.find(item => item.productId === product._id);
//             if (existingItem) {
//                 return prevItems.map(item =>
//                     item.productId === product._id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 return [
//                     ...prevItems,
//                     {
//                         productId: product._id,
//                         ItemName: product.ItemName,
//                         quantity: 1,
//                         amount: product.amount,
//                     },
//                 ];
//             }
//         });
//     }, []);

//     const handleCheckout = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/api/cart', cartItems);
//             if (response.data.success) {
//                 alert('Items added to cart successfully!');
//                 setCartItems([]); // Clear the cart after adding
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             alert('Error adding items to cart.');
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-4">Manufacturing Products</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {products.map((product) => (
//                     <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
//                         <h2 className="text-xl font-semibold">{product.ItemName}</h2>
//                         <p className="text-gray-700">Stock: {product.stock}</p>
//                         <p className="text-gray-700">Amount: ${product.amount}</p>
//                         <button
//                             onClick={() => addToCart(product)}
//                             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <button
//                 onClick={handleCheckout}
//                 className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//             >
//                 Checkout
//             </button>
//         </div>
//     );
// };

// export default ManufacturingProductList;



'use client';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ManufacturingProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/manufacturingAdd');
                if (response.data.success) {
                    setProducts(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = useCallback(async (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevItems,
                    {
                        productId: product._id,
                        ItemName: product.ItemName,
                        quantity: 1,
                        amount: product.amount,
                    },
                ];
            }
        });

        // Handle checkout immediately after adding to cart
        try {
            const response = await axios.post('http://localhost:4000/api/cart', cartItems);
            if (response.data.success) {
                alert('Items added to cart successfully!');
                setCartItems([]); // Clear the cart after adding
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Error adding items to cart.');
        }
    }, [cartItems]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Manufacturing Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">{product.ItemName}</h2>
                        <p className="text-gray-700">Stock: {product.stock}</p>
                        <p className="text-gray-700">Amount: ${product.amount}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManufacturingProductList;
