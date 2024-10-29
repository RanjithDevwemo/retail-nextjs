

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerManagement = () => {
    // State for the form
    const [formData, setFormData] = useState({
        id: '',
        processNumber: '',
        jobWorkNumber: '',
        targetQuantity: '',
        completedQuantity: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // State for the table
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Handle form input change
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

        // Validate inputs
        if (!formData.processNumber || !formData.jobWorkNumber || !formData.targetQuantity || !formData.completedQuantity) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = formData.id
                ? await axios.put(`http://localhost:4000/api/worker/${formData.id}`, formData)
                : await axios.post('http://localhost:4000/api/worker', formData);

            if (response.data.success) {
                setSuccessMessage(`Worker ${formData.id ? 'updated' : 'added'} successfully!`);
                setFormData({
                    id: '',
                    processNumber: '',
                    jobWorkNumber: '',
                    targetQuantity: '',
                    completedQuantity: ''
                });
                fetchWorkers(); 
            } else {
                setError(response.data.message || 'Failed to add/update worker.');
            }
        } catch (err) {
            setError('An error occurred while adding/updating the worker.');
        }
    };

    // Fetch workers from the API
    const fetchWorkers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/api/worker');
            if (response.data.success) {
                setWorkers(response.data.data);
            } else {
                setFetchError(response.data.message);
            }
        } catch (err) {
            setFetchError('An error occurred while fetching workers.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch workers when the component mounts
    useEffect(() => {
        fetchWorkers();
    }, []);

  // Search handler
const handleSearch = (e) => {
    setSearchTerm(e.target.value);
};

// Filtered workers based on the search term
const filteredWorkers = workers.filter(worker => 
    (worker.processNumber && worker.processNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (worker.jobWorkNumber && worker.jobWorkNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (worker.name && worker.name.toLowerCase().includes(searchTerm.toLowerCase()))
);


    // Edit worker
    const handleEdit = (worker) => {
        setFormData({
            id: worker._id,
            processNumber: worker.processNumber,
            jobWorkNumber: worker.jobWorkNumber,
            targetQuantity: worker.targetQuantity,
            completedQuantity: worker.completedQuantity
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add/Edit SubContracting</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="processNumber">Process Number</label>
                    <input
                        type="text"
                        id="processNumber"
                        name="processNumber"
                        value={formData.processNumber}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="jobWorkNumber">Job Work Number</label>
                    <input
                        type="text"
                        id="jobWorkNumber"
                        name="jobWorkNumber"
                        value={formData.jobWorkNumber}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="targetQuantity">Target Quantity</label>
                    <input
                        type="number"
                        id="targetQuantity"
                        name="targetQuantity"
                        value={formData.targetQuantity}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="completedQuantity">Completed Quantity</label>
                    <input
                        type="number"
                        id="completedQuantity"
                        name="completedQuantity"
                        value={formData.completedQuantity}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    {formData.id ? 'Update Worker' : 'Add Worker'}
                </button>
            </form>

            <h1 className="text-2xl font-bold mb-4 mt-8">Workers List</h1>
            <input 
                type="text" 
                placeholder="Search by Process Number, Job Work Number, or Name" 
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 w-full border border-gray-300 p-2 rounded"
            />
            {loading ? (
                <div>Loading...</div>
            ) : fetchError ? (
                <div className="text-red-500">{fetchError}</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">S.No</th>
                            <th className="border border-gray-300 p-2">Process Number</th>
                            <th className="border border-gray-300 p-2">Job Work Number</th>
                           
                            <th className="border border-gray-300 p-2">Target Quantity</th>
                            <th className="border border-gray-300 p-2">Completed Quantity</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkers.map((worker, index) => (
                            <tr key={worker._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{worker.processNumber}</td>
                                <td className="border border-gray-300 p-2">{worker.jobWorkNumber}</td>
                            
                                <td className="border border-gray-300 p-2">{worker.targetQuantity}</td>
                                <td className="border border-gray-300 p-2">{worker.completedQuantity}</td>
                                <td className="border border-gray-300 p-2">
                                    <button 
                                        onClick={() => handleEdit(worker)}
                                        className="bg-yellow-500 text-white p-1 rounded"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WorkerManagement;
