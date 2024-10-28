'use client';
import { useState } from 'react';
import axios from 'axios';

const AddManufacturingProduct = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemCategory: '',
        stock: '',
        minimumStock: '',
        amount: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/manufacturingAdd', {
                ItemName: formData.itemName,
                ItemCategory: formData.itemCategory,
                stock: parseFloat(formData.stock),
                minimumStock: parseFloat(formData.minimumStock),
                amount: parseFloat(formData.amount),
            });

            if (response.data.success) {
                setMessage(response.data.message);
                // Clear form fields after successful submission
                setFormData({
                    itemName: '',
                    itemCategory: '',
                    stock: '',
                    minimumStock: '',
                    amount: ''
                });
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Error adding product. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add Manufacturing Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Name:</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Category:</label>
                    <input
                        type="text"
                        name="itemCategory"
                        value={formData.itemCategory}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Minimum Stock:</label>
                    <input
                        type="number"
                        name="minimumStock"
                        value={formData.minimumStock}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Add Product
                </button>
            </form>
            {message && <div className="mt-4 text-green-600">{message}</div>}
            {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>
    );
};

export default AddManufacturingProduct;
