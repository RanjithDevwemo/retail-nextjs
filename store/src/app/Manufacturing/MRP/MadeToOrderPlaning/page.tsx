
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                setError('An error occurred while fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Made To Order Planing</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Item Name</th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">In Stock</th>
                        <th className="border border-gray-300 p-2">Total Orders</th>
                        <th className="border border-gray-300 p-2">Require Quantity</th>
                        <th className="border border-gray-300 p-2">To Be Orders</th>
                  
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{product.ItemName}</td>
                            <td className="border border-gray-300 p-2">{product.ItemCategory}</td>
                            <td className="border border-gray-300 p-2">{product.stock}</td>
                            <td className="border border-gray-300 p-2">{product.oldstock}</td>
                            <td className="border border-gray-300 p-2">0</td>
                            <td className="border border-gray-300 p-2">{product.tobeOrdered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
