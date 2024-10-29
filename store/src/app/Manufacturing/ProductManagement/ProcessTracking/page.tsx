'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BOMList = () => {
    const [bomItems, setBomItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const statuses = ['Pending', 'Completed', 'Cancelled', 'WIP'];

    useEffect(() => {
        const fetchBOM = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/bom');
                if (response.data.success) {
                    setBomItems(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching BOM data.');
            } finally {
                setLoading(false);
            }
        };

        fetchBOM();
    }, []);

    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/bom/${itemId}`, { status: newStatus });
            if (response.data.success) {
                setBomItems(prevItems =>
                    prevItems.map(item =>
                        item._id === itemId ? { ...item, status: newStatus } : item
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
    <h1 className="text-2xl font-bold mb-4">Bill of Materials</h1>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
            <tr className="bg-gray-200 text-gray-600">
                <th className="p-4 border">S.No</th>
                <th className="p-2 border">Stage</th>
                <th className="p-2 border">BOM Number</th>

                <th className="p-4 border">FG Name</th>
                {/* <th className="p-4 border">Quantity</th>
                <th className="p-4 border">Unit</th>
                <th className="p-4 border">Single Product Price</th>
                <th className="p-4 border">Total Amount</th>
                <th className="p-4 border">Order Date</th> */}
               
            </tr>
        </thead>
        <tbody>
            {bomItems.map((item,index) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="p-4 border">{index+1}</td>
                    <td className="p-4 border">
                        <select
                            value={item.status}
                            onChange={(e) => updateStatus(item._id, e.target.value)}
                            className={`ml-1 border border-gray-300 rounded ${getStatusColor(item.status)}`}
                        >
                            {statuses.map(status => (
                                <option className='bg-white text-black' key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="p-4 border">{item._id}</td>
                    <td className="p-4 border">{item.name}</td>
                    {/* <td className="p-4 border">{item.quantity}</td>
                    <td className="p-4 border">{item.unit}</td>
                    <td className="p-4 border">${item.singleProduct}</td>
                    <td className="p-4 border">${item.totalAmount}</td>
                    <td className="p-4 border">{new Date(item.orderDate).toLocaleString()}</td>
                  */}
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};

export default BOMList;
