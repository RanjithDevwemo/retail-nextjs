'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddB2B = () => {
    // State for form data
    const [formData, setFormData] = useState({
        companyName: '',
        dealOwner: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:4000/api/b2badd', formData);

            if (response.data.success) {
                setSuccessMessage('B2B values added successfully!');
                setFormData({ companyName: '', dealOwner: '' }); // Reset form
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred while adding B2B values.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add B2B Value</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="dealOwner">Deal Owner</label>
                    <input
                        type="text"
                        id="dealOwner"
                        name="dealOwner"
                        value={formData.dealOwner}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Add B2B Value
                </button>
            </form>
        </div>
    );
};

export default AddB2B;
