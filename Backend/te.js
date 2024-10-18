// this is backend add to bill code 
// app.post('/addtobill', async (req, res) => {
//     try {
//         const items = req.body; // Expecting an array of items
//         const cartItems = [];

//         // Validate input
//         if (!Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, message: 'Invalid input. Must provide an array of items.' });
//         }

//         for (const item of items) {
//             const {
//                 productId,
//                 productName,
//                 productPrice,
//                 category,
//                 gst,
//                 reorderPoint,
//                 sku,
//                 quantity = 1,
//                 warehouse
//             } = item;

//             // Validate required fields for each item
//             if (!productId || !productName || !productPrice || !category || !gst || !sku || !reorderPoint || !warehouse) {
//                 return res.status(400).json({ success: false, message: 'Missing required fields in item' });
//             }

//             // Find the product by SKU
//             const product = await Product.findOne({ sku });
//             if (!product) {
//                 return res.status(404).json({ success: false, message: `Product not found with SKU: ${sku}` });
//             }

//             // Check available stock for the specified warehouse
//             const availableStock = product.stock[warehouse] || 0;

//             // Ensure the requested quantity is less than or equal to the available stock
//             if (quantity > availableStock) {
//                 return res.status(400).json({ success: false, message: `Insufficient stock for ${productName} in ${warehouse}` });
//             }

//             // Check if the cart item already exists
//             let cartItem = await Cart.findOne({ sku, warehouse });

//             if (cartItem) {
//                 // Check stock availability before updating the cart item
//                 if (availableStock >= cartItem.quantity + quantity) {
//                     // Product exists in the cart, update its quantity
//                     cartItem.quantity += quantity; // Update with new quantity
//                     await cartItem.save();
//                 } else {
//                     return res.status(400).json({ success: false, message: `Insufficient stock for ${productName} in ${warehouse}` });
//                 }
//             } else {
//                 // Create a new cart entry
//                 cartItem = new Cart({
//                     productId: product._id,
//                     productName,
//                     productPrice,
//                     category,
//                     gst,
//                     quantity,
//                     reorderPoint,
//                     sku,
//                     warehouse
//                 });
//                 await cartItem.save();
//             }

//             // Store cart item for response
//             cartItems.push(cartItem);
//         }

//         res.json({ success: true, message: 'Products added to bill successfully', cart: cartItems });

//     } catch (error) {
//         console.error('Error adding products to bill:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to add products to bill' });
//     }
// });

// and example json value is  
// [
//     {
//         "productId": "670fb8df57974eaa8bd8d3a2",
//         "productName": "Sample Product update",
//         "productPrice": 100,
//         "category": "electronics",
//         "gst": 18,
//         "reorderPoint": 10,
//         "sku": "SKU12345wewq",
//         "quantity": 50,
//         "warehouse": "covai"
//     },
//     {
//         "productId": "670fba7757974eaa8bd8d3b0",
//         "productName": "Sample Product1",
//         "productPrice": 14310,
//         "category": "electronicsww223",
//         "gst": 18,
//         "reorderPoint": 10,
//         "sku": "SKU12345q",
//         "quantity": 5,
//         "warehouse": "ooty"
//     }
// ]
// the wrong frontend codes are  

// the context code's function is 
//    // Add product to the bill
//    const billCart = async (productId, productName, productPrice, category, gst, reorderPoint, sku) => {
//     try {
//         const response = await axios.post('http://localhost:4000/addtobill', {
//             productId,
//             productName,
//             productPrice,
//             category,
//             gst,
//             reorderPoint,
//             sku
//         });
//         console.log('Add to bill response:', response.data);
//         fetchCartItems(); // Refresh cart items after adding
//     } catch (error) {
//         console.error('Error adding to bill:', error.message);
//     }
// }; 
// and the User Inter face code is 

// 'use client';
// import '@/app/Component/AllOrderProducts/AllOrderProducts.css';
// import { useAppContext } from '@/app/Context';
// import Image from 'next/image';
// import { useState } from 'react';

// function Products() {
//     const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();
//     const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
//     const [warehouseFilter, setWarehouseFilter] = useState(''); // State for warehouse filter

//     const handleCardClick = (product) => {
//         const totalStock = Object.values(product.stock).reduce((acc, val) => acc + Number(val), 0);
//         if (totalStock > 0) {
//             billCart(
//                 product._id,
//                 product.name,
//                 product.finalPrice,
//                 product.category,
//                 product.gst,
//                 product.reorderPoints,
//                 product.sku
//             );
//         } else {
//             alert("Out of stock, cannot order this product");
//         }
//     };

//     // Function to sort products based on the selected order
//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         switch (sortOrder) {
//             case 'asc':
//                 return a.name.localeCompare(b.name);
//             case 'desc':
//                 return b.name.localeCompare(a.name);
//             case 'lowToHigh':
//                 return a.finalPrice - b.finalPrice;
//             case 'highToLow':
//                 return b.finalPrice - a.finalPrice;
//             default:
//                 return 0;
//         }
//     });

//     // Function to filter products based on the selected warehouse
//     const filteredProductsByWarehouse = sortedProducts.filter(product => {
//         if (!warehouseFilter) return true; // Show all if no warehouse is selected
//         return product.stock[warehouseFilter] > 0; // Only show products with stock in the selected warehouse
//     });

//     const handleSortChange = (e) => {
//         setSortOrder(e.target.value);
//     };

//     const handleWarehouseFilterChange = (e) => {
//         setWarehouseFilter(e.target.value);
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
//             <div className="mb-4 text-end">
//                 <select
//                     id="sortOrder"
//                     value={sortOrder}
//                     onChange={handleSortChange}
//                     className="p-2 border rounded cursor-pointer w-full sm:w-auto"
//                 >
//                     <option value="asc">A to Z</option>
//                     <option value="desc">Z to A</option>
//                     <option value="lowToHigh">Low Price to High</option>
//                     <option value="highToLow">High Price to Low</option>
//                 </select>
//             </div>

//             {/* Dropdown for warehouse filtering */}
//             <div className="mb-4 text-end">
//                 <select
//                     id="warehouseFilter"
//                     value={warehouseFilter}
//                     onChange={handleWarehouseFilterChange}
//                     className="p-2 border rounded cursor-pointer w-full sm:w-auto"
//                 >
//                     <option value="">All Warehouses</option>
//                     {Object.keys(filteredProducts[0]?.stock || {}).map(warehouse => (
//                         <option key={warehouse} value={warehouse}>
//                             {warehouse}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className="flex-grow h-0">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//                     {filteredProductsByWarehouse.length === 0 ? (
//                         <p className="text-center col-span-full">No products found</p>
//                     ) : (
//                         filteredProductsByWarehouse.map(product => (
//                             <div
//                                 key={product._id}
//                                 className="border rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
//                                 onClick={() => handleCardClick(product)}
//                             >
//                                 <Image 
//                                     src={product.image} 
//                                     alt={product.name} 
//                                     width={160} 
//                                     height={130} 
//                                     className="w-full h-40 object-cover" 
//                                 />
//                                 <div className='bg-blue-600 text-white text-center p-2'>
//                                     <h4 className="text-lg">{product.name}</h4>
//                                     {/* Display dynamic stock value for the selected warehouse */}
//                                     {warehouseFilter ? (
//                                         <h2>Stock: {product.stock[warehouseFilter] || 0}</h2>
//                                     ) : (
//                                         <h2>Stock: {Object.values(product.stock).reduce((acc, val) => acc + Number(val), 0)}</h2>
//                                     )}
//                                     <p className="product-price">${product.finalPrice.toFixed(2)}</p>
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

// rewrite the frontend code are correctly






'use client';

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext("");

export function AppWrapper({ children }) {
    // State management
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
    const [storeId, setStoreId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [getAllOrders, setGetAllOrders] = useState('');

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:4000/store/verify-token', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const { success, user } = response.data;
                if (success) {
                    setAuth({ isAuthenticated: true, user });
                } else {
                    localStorage.removeItem('auth-token');
                    setAuth({ isAuthenticated: false, user: null });
                }
            } catch (error) {
                console.error("Token verification error:", error);
                localStorage.removeItem('auth-token');
                setAuth({ isAuthenticated: false, user: null });
            }
        };
        verifyToken();
    }, [token]);

    // Decode token to get store ID
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setStoreId(decodedToken.store.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search term
    useEffect(() => {
        const filtered = searchTerm
            ? products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : products;
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getall/Cartproducts');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };

    // Update cart items on mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch all order details
    const getAllOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/fetch/graph');
            setGetAllOrders(response.data);
        } catch (error) {
            console.error("Fetching orders error:", error);
        }
    };

    useEffect(() => {
        getAllOrderDetails();
    }, []);

    // User login
    const login = (token, user) => {
        localStorage.setItem('auth-token', token);
        setAuth({ isAuthenticated: true, user });
    };

    // Fetch store name
    useEffect(() => {
        const fetchStoreName = async () => {
            if (!storeId) return;

            try {
                const response = await axios.get(`http://localhost:4000/storename/${storeId}`);
                if (response.data.success) {
                    setStoreName(response.data.store.name);
                } else {
                    console.error("Error fetching store name");
                }
            } catch (error) {
                console.error("Error fetching store name:", error);
            }
        };
        fetchStoreName();
    }, [storeId]);

    // User logout
    const logout = () => {
        localStorage.removeItem('auth-token');
        setAuth({ isAuthenticated: false, user: null });
        window.location.href = '/login';
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Add product to the bill
    const billCart = async (productId, productName, productPrice, category, gst, reorderPoint, sku, quantity, warehouse) => {
        try {
            const response = await axios.post('http://localhost:4000/addtobill', [{
                productId,
                productName,
                productPrice,
                category,
                gst,
                reorderPoint,
                sku,
                quantity,
                warehouse
            }]);
            console.log('Add to bill response:', response.data);
            fetchCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error('Error adding to bill:', error.message);
        }
    };

    return (
        <AppContext.Provider value={{
            auth,
            login,
            logout,
            products,
            setFilteredProducts,
            filteredProducts,
            searchTerm,
            handleSearchChange,
            billCart,
            cartItems,
            setCartItems,
            getAllOrders,
            storeId,
            storeName
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}








    // Context function to add product to the bill
    const billCart = async (productId, productName, productPrice, category, gst, reorderPoint, sku, quantity, warehouse) => {
        try {
            const response = await axios.post('http://localhost:4000/addtobill', [{
                productId,
                productName,
                productPrice,
                category,
                gst,
                reorderPoint,
                sku,
                quantity,
                warehouse
            }]);
            console.log('Add to bill response:', response.data);
            fetchCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error('Error adding to bill:', error.message);
        }
    };
