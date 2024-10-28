'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BOMList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/bom');
                if (response.data.success) {
                    setItems(response.data.data);
                } else {
                    setError(response.data.message); 
                }
            } catch (err) {
                setError('Error fetching items.'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Bill of Materials (BOM) List</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">S.No</th>
                        <th className="px-4 py-2 border">Item Name</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Unit</th>
                        {/* <th className="px-4 py-2 border">Single Product Price</th>
                        <th className="px-4 py-2 border">Total Amount</th> */}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{index + 1}</td> 
                            <td className="px-4 py-2 border">{item.name}</td>
                            <td className="px-4 py-2 border">{item.quantity}</td>
                            <td className="px-4 py-2 border">{item.unit}</td>
                            {/* <td className="px-4 py-2 border">{item.singleProduct}</td>
                            <td className="px-4 py-2 border">{item.totalAmount}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BOMList;
