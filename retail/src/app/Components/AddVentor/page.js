// 'use client'
// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios';
// export default function AddVentor() {
//     const [formData,setFromData]=useState({
//         id:'',
//         name:'',
//         address:'',
//         phone:'',
//         email:''
//     })

//     const handleChangle=(e)=>{
//         const {name,value}=e.target;

//         setFromData((prev)=>({
//             ...prev,
//             [name]:value
//         }))
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault();
// try{
//     const response=await axios.post('http://localhost:4000/addventor',formData);
//    if(response.data.success){
//     alert("Venter Account Created Successfully");
//     setFromData({
//         id:'',
//         name:'',
//         address:'',
//         phone:'',
//         email:''
//     })
//    }

    
// }catch(error){
//     console.log("cannot add ventot : ",error);
    
// }

//     }

//   return (
//     <div>
//      <form action="">
        
//         <div className="addventor-itemfield">
//             <label htmlFor="">Ventor Id : </label>
//             <input type="text" placeholder='Enter a Ventor Id'
//             name='id'
//              onChange={handleChangle} 
//             value={formData.id}
//             required/>
//         </div>
//         <div className="addventor-itemfield">
//             <label htmlFor="">Ventor Name : </label>
//             <input type="text" placeholder='Enter a Ventor Name'
//             name='name'
//                  onChange={handleChangle} 
//                  value={formData.name}
//             required/>
//         </div>

//         <div className="addventor-itemfield">
//             <p>Address : </p>
//             <textarea placeholder='Enter Ventor Address' type="text"
//             name='address'
//                  onChange={handleChangle} 
//                  value={formData.address}
//             required/>
//         </div>

//         <div className="addventor-itemfield">
//             <label htmlFor="">Phone : </label>
//             <input type="text" placeholder='Enter Phone number'
//             name='phone'
//                  onChange={handleChangle} 
//                  value={formData.phone}
//             required/>
//         </div>

//         <div className="addventor-itemfield">
//             <label htmlFor="">Email : </label>
//             <input type="email" placeholder='Enter ventor email '
//             name='email'
//                  onChange={handleChangle} 
//                  value={formData.email}
//             required/>
//         </div>

//         <button type='submit' onClick={handleSubmit}>Submit</button>
//      </form>
//     </div>
//   )
// }



'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function AddVentor() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/addventor', formData);
            if (response.data.success) {
                alert("Vendor Account Created Successfully");
                setFormData({
                    id: '',
                    name: '',
                    address: '',
                    phone: '',
                    email: ''
                });
            }
        } catch (error) {
            console.log("Cannot add vendor: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Vendor</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Vendor Id:</label>
                    <input
                        type="text"
                        placeholder='Enter a Vendor Id'
                        name='id'
                        onChange={handleChange}
                        value={formData.id}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Vendor Name:</label>
                    <input
                        type="text"
                        placeholder='Enter a Vendor Name'
                        name='name'
                        onChange={handleChange}
                        value={formData.name}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Address:</label>
                    <textarea
                        placeholder='Enter Vendor Address'
                        name='address'
                        onChange={handleChange}
                        value={formData.address}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows={4}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Phone:</label>
                    <input
                        type="text"
                        placeholder='Enter Phone Number'
                        name='phone'
                        onChange={handleChange}
                        value={formData.phone}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        placeholder='Enter Vendor Email'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <button type='submit' className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                    Submit
                </button>
            </form>
        </div>
    );
}
