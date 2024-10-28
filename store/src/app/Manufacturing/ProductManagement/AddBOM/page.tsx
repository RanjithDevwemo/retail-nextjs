// 'use client';
// import { useState } from 'react';
// import axios from 'axios';

// const CreateBOM = () => {
//     const [name, setName] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [unit, setUnit] = useState('');


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:4000/api/bom', {
//                 name,
//                 quantity,
//                 unit,
//             });
//             alert(response.data.success);
//             if(response.data.success){
//                 setName('');
//                 setQuantity('');
//                 setUnit('');
//             }

//         } catch (error) {
//             console.error('Error creating BOM:', error);
       
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-4">Create Bill of Materials</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Quantity:</label>
//                     <input
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Unit:</label>
//                     <input
//                         type="text"
//                         value={unit}
//                         onChange={(e) => setUnit(e.target.value)}
//                         required
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateBOM;












'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AddBOM () {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('milliliter'); 
    const [singleProduct, setSingleProduct] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/bom', {
                name,
                quantity,
                unit,
                singleProduct: parseFloat(singleProduct), // Convert to float
            });
            alert(response.data.message); // Show the message from the server
            if (response.data.success) {
                setName('');
                setQuantity('');
                setUnit('milliliter'); // Reset to default unit
                setSingleProduct(''); // Reset single product
            }
        } catch (error) {
            console.error('Error creating BOM:', error);
            alert("An error occurred while creating the BOM."); // Optional error alert
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Bill of Materials</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit:</label>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="milliliter">Milliliter</option>
                        <option value="milligram">Milligram</option>
                        <option value="liter">Liter</option>
                        <option value="kilogram">Kilogram</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Single Product Amount:</label>
                    <input
                        type="number"
                        value={singleProduct}
                        onChange={(e) => setSingleProduct(e.target.value)}
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


