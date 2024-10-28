'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManufacturingProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Manufacturing Products List</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">S.No</th>
                        <th className="px-4 py-2 border">Item Name</th>
                        <th className="px-4 py-2 border">Item Category</th>
                        <th className="px-4 py-2 border">Stock</th>
                        <th className="px-4 py-2 border">Minimum Stock</th>
                        <th className="px-4 py-2 border">To Be Ordered</th>
                        {/* <th className="px-4 py-2 border">Amount</th> */}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{product.ItemName}</td>
                            <td className="px-4 py-2 border">{product.ItemCategory}</td>
                            <td className="px-4 py-2 border">{product.stock}</td>
                            <td className="px-4 py-2 border">{product.minimumStock}</td>
                            <td className="px-4 py-2 border">{product.tobeOrdered}</td>
                            {/* <td className="px-4 py-2 border">{product.amount}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManufacturingProductList;
