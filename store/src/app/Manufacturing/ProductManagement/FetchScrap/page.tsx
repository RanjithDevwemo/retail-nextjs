'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ScrapList = () => {
    const [scraps, setScraps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScraps = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/scrap');
                if (response.data.success) {
                    setScraps(response.data.data); 
                } else {
                    setError(response.data.message); 
                }
            } catch (err) {
                setError('Error fetching scraps.'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchScraps();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Scrap List</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Item Name</th>
                        <th className="px-4 py-2 border">Item Category</th>
                        <th className="px-4 py-2 border">Estimated Quantity</th>
                        <th className="px-4 py-2 border">Actual Quantity</th>
                        <th className="px-4 py-2 border">Unit</th>
                        <th className="px-4 py-2 border">Cost Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {scraps.map((scrap) => (
                        <tr key={scrap._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{scrap.ItemName}</td>
                            <td className="px-4 py-2 border">{scrap.ItemCategory}</td>
                            <td className="px-4 py-2 border">{scrap.EstimateQuantity}</td>
                            <td className="px-4 py-2 border">{scrap.ActualQuantity}</td>
                            <td className="px-4 py-2 border">{scrap.Unit}</td>
                            <td className="px-4 py-2 border">{scrap.CostAllocation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScrapList;
