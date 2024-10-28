'use client';
import { useState } from 'react';
import axios from 'axios';

export default function CreateScrap() {
    const [formData, setFormData] = useState({
        ItemName: '',
        ItemCategory: '',
        EstimateQuantity: '',
        ActualQuantity: '',
        Unit: 'ML', 
        CostAllocation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/scrap', formData);
            alert(response.data.message);
            if (response.data.success) {
                setFormData({
                    ItemName: '',
                    ItemCategory: '',
                    EstimateQuantity: '',
                    ActualQuantity: '',
                    Unit: 'milliliter',
                    CostAllocation: '',
                }); 
            }
        } catch (error) {
            console.error('Error creating scrap:', error);
            alert("An error occurred while creating the scrap.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Scrap</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Name:</label>
                    <input
                        type="text"
                        name="ItemName"
                        value={formData.ItemName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Category:</label>
                    <input
                        type="text"
                        name="ItemCategory"
                        value={formData.ItemCategory}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Estimated Quantity:</label>
                    <input
                        type="number"
                        name="EstimateQuantity"
                        value={formData.EstimateQuantity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Actual Quantity:</label>
                    <input
                        type="number"
                        name="ActualQuantity"
                        value={formData.ActualQuantity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit:</label>
                    <select
                        name="Unit"
                        value={formData.Unit}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="ML">Milliliter</option>
                        <option value="MG">Milligram</option>
                        <option value="Ltr">Liter</option>
                        <option value="KG">Kilogram</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cost Allocation:</label>
                    <input
                        type="number"
                        name="CostAllocation"
                        value={formData.CostAllocation}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};


