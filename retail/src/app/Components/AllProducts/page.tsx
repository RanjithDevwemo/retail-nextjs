'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaIndianRupeeSign } from "react-icons/fa6";
// import "../../CssComponents/AllProduct.css";

function Products() {
    const { filteredProducts, handleCategoryChange } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    // Calculate pagination
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(npage).keys()].map(num => num + 1);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/allproducts');
                const products = response.data;
                const uniqueCategories = [...new Set(products.map(product => product.category))];
                setCategories(['All', ...uniqueCategories]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDropdownChange = (event) => {
        handleCategoryChange(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="mb-4">
                <select 
                    onChange={handleDropdownChange} 
                    className="border rounded-md p-2"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className='p-3 border'>Image</th>
                        <th className='p-3 border'>Name</th>
                        <th className='p-3 border'>Category</th>
                        <th className='p-3 border'>Description</th>
                        <th className='p-3 border'>Price</th>
                        <th className='p-3 border'>SKU</th>
                        <th className='p-3 border'>Stock</th>
                        <th className='p-3 border'>Stock Status</th>
                        <th className='p-3 border'>GST</th>
                        <th className='p-3 border'>Edit</th>
                        <th className='p-3 border'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(product => (
                        <tr key={product._id}>
                            <td className="p-3 border">
                                <Image 
                                    src={product.image}
                                    alt='image'
                                    height={50}
                                    width={50}
                                />
                            </td>
                            <td className="p-3 border">{product.name}</td>
                            <td className="p-3 border">{product.category}</td>
                            <td className="p-3 border">{product.description}</td>
                            <td className="p-3 border"><FaIndianRupeeSign className="inline"/>{product.finalPrice}</td>
                            <td className="p-3 border">{product.sku}</td>
                            <td className="p-3 border">{product.stock}</td>
                            <td className="p-3 border">
                                {product.stock > 0 ? 
                                    <p className="text-green-500">In Stock</p> : 
                                    <p className="text-red-500">Out Of Stock</p>
                                }
                            </td>
                            <td className="p-3 border">{product.gst}%</td>
                            <td className="p-3 border">
                                <Link href={`/edit/${product._id}`} className="text-blue-600 hover:underline">
                                    Edit
                                </Link>
                            </td>
                            <td className="p-3 border">
                                <button 
                                    onClick={() => handleDelete(product._id)} 
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav className="mt-4">
                <ul className="flex justify-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1} 
                            className="bg-blue-500 text-white p-2 rounded-l-md"
                        >
                            Previous
                        </button>
                    </li>
                    {numbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button 
                                onClick={() => handlePageChange(number)} 
                                className="bg-blue-500 text-white p-2 mx-1 rounded-md"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === npage} 
                            className="bg-blue-500 text-white p-2 rounded-r-md"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Products;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import "../../CssComponents/AllProduct.css";

// function Products() {
//     const { filteredProducts, handleCategoryChange } = useAppContext();
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 5;

//     // Calculate pagination
//     const lastIndex = currentPage * recordsPerPage;  //current =2,recordsperpage=max 5, 2*5  //10
//     const firstIndex = lastIndex - recordsPerPage;      //la=10,rpp=5, 10-5 5
//     const records = filteredProducts.slice(firstIndex, lastIndex);    //fil=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]  recode=5 (6,10)     
//     const npage = Math.ceil(filteredProducts.length / recordsPerPage);  //15/5=3
//     const numbers = [...Array(npage).keys()].map(num => num + 1);    //npage=3, [...Array(npage).keys()]=[0,1,2] numbers=[1,2,3] 

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/allproducts');
//                 const products = response.data;
//                 const uniqueCategories = [...new Set(products.map(product => product.category))];
//                 setCategories(['All', ...uniqueCategories]);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDropdownChange = (event) => {
//         handleCategoryChange(event.target.value);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
//             // Refresh data after deletion
//             window.location.reload();
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleNextPage = () => {
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="products">
//             <h1>Product List</h1>
//             <div className="filter-dropdown">
//                 <select onChange={handleDropdownChange}>
//                     {categories.map((category, index) => (
//                         <option key={index} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <table className="">
//                 <thead>
//                     <tr>
//                         <th className='bg-red-700'>Image</th>
//                         <th>Name</th>
//                         <th>Category</th>
//                         <th>Description</th>
//                         <th>Price</th>
//                         <th>SKU</th>
//                         <th>Stock</th>
//                         <th>Stock Status</th>
//                         <th>GST</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {records.map(product => (
//                         <tr key={product._id}>
//                             <td>
//                                 <Image 
//                                     src={product.image}
//                                     alt='image'
//                                     height={50}
//                                     width={50}
//                                 />
//                             </td>
//                             <td>{product.name}</td>
//                             <td>{product.category}</td>
//                             <td>{product.description}</td>
//                             <td>${product.finalPrice}</td>
//                             <td>{product.sku}</td>
//                             <td>{product.stock}</td>
//                             <td>
//                                 {product.stock > 0 ? 
//                                     <p style={{ color: 'green' }}>In Stock</p> : 
//                                     <p style={{ color: 'red' }}>Out Of Stock</p>
//                                 }
//                             </td>
//                             <td>{product.gst}%</td>
//                             <td>
//                                 <Link href={`/edit/${product._id}`}>
//                                     Edit
//                                 </Link>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(product._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <nav>
//                 <ul className="pagination">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button onClick={handlePrevPage} disabled={currentPage === 1}>
//                             Previous
//                         </button>
//                     </li>
//                     {numbers.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button onClick={() => handlePageChange(number)}>{number}</button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
//                         <button onClick={handleNextPage} disabled={currentPage === npage}>
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Products;




// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useAppContext } from '@/app/Context';
// // import axios from 'axios';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { MdOutlineArrowDropDown } from "react-icons/md";

// // function Products() {
// //     const { filteredProducts, handleCategoryChange } = useAppContext();
// //     const [categories, setCategories] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const recordsPerPage = 5;

// //     // Calculate pagination
// //     const lastIndex = currentPage * recordsPerPage;
// //     const firstIndex = lastIndex - recordsPerPage;
// //     const records = filteredProducts.slice(firstIndex, lastIndex);
// //     const npage = Math.ceil(filteredProducts.length / recordsPerPage);
// //     const numbers = [...Array(npage).keys()].map(num => num + 1);

// //     // Fetch categories on component mount
// //     useEffect(() => {
// //         const fetchCategories = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:4000/api/allproducts');
// //                 const products = response.data;
// //                 const uniqueCategories = [...new Set(products.map(product => product.category))];
// //                 setCategories(['All', ...uniqueCategories]);
// //             } catch (error) {
// //                 console.error("Error fetching categories:", error);
// //             }
// //         };

// //         fetchCategories();
// //     }, []);

// //     const handleDropdownChange = (event) => {
// //         handleCategoryChange(event.target.value);
// //     };

// //     const handleDelete = async (id) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
// //             setCurrentPage(1); // Reset to first page after delete
// //             // Optionally, re-fetch products here or use state to manage filteredProducts
// //         } catch (error) {
// //             console.error("Error deleting product:", error);
// //         }
// //     };

// //     const handlePageChange = (pageNumber) => {
// //         setCurrentPage(pageNumber);
// //     };

// //     const handleNextPage = () => {
// //         if (currentPage < npage) {
// //             setCurrentPage(currentPage + 1);
// //         }
// //     };

// //     const handlePrevPage = () => {
// //         if (currentPage > 1) {
// //             setCurrentPage(currentPage - 1);
// //         }
// //     };

// //     return (
// //         <div className="p-5">
// //             <h1 className="text-2xl font-bold mb-4">Product List</h1>
// //             <div className="flex justify-between mb-4">
// //                 <div className="flex items-center">
// //                     <label className="mr-2 font-semibold">Filter by Category:</label>
// //                     <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2">
// //                         {categories.map((category, index) => (
// //                             <option key={index} value={category}>
// //                                 {category}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 font-semibold">
// //                     Filter <MdOutlineArrowDropDown />
// //                 </button>
// //             </div>

// //             <table className="min-w-full border border-gray-300">
// //                 <thead className="bg-slate-100">
// //                     <tr>
// //                         <th className="bg-blue-400 p-3 font-bold">Image</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Name</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Category</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Description</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Price</th>
// //                         <th className="bg-blue-400 p-3 font-bold">SKU</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Stock</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Status</th>
// //                         <th className="bg-blue-400 p-3 font-bold">GST</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Edit</th>
// //                         <th className="bg-blue-400 p-3 font-bold">Delete</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {records.map(product => (
// //                         <tr key={product._id} className="text-center border-b">
// //                             <td>
// //                                 <Image
// //                                     src={product.image}
// //                                     alt='image'
// //                                     height={50}
// //                                     width={50}
// //                                     className="mx-auto"
// //                                 />
// //                             </td>
// //                             <td>{product.name}</td>
// //                             <td>{product.category}</td>
// //                             <td>{product.description}</td>
// //                             <td>${product.finalPrice}</td>
// //                             <td>{product.sku}</td>
// //                             <td>{product.stock}</td>
// //                             <td>
// //                                 {product.stock > 0 ? 
// //                                     <span className="text-green-500">In Stock</span> : 
// //                                     <span className="text-red-500">Out of Stock</span>
// //                                 }
// //                             </td>
// //                             <td>{product.gst}%</td>
// //                             <td>
// //                                 <Link href={`/edit/${product._id}`} className="text-blue-500">Edit</Link>
// //                             </td>
// //                             <td>
// //                                 <button onClick={() => handleDelete(product._id)} className="text-red-500">Delete</button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>

// //             <nav className="mt-4">
// //                 <ul className="flex justify-center">
// //                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
// //                         <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded-l-md">
// //                             Previous
// //                         </button>
// //                     </li>
// //                     {numbers.map(number => (
// //                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
// //                             <button onClick={() => handlePageChange(number)} className="bg-blue-500 text-white p-2 mx-1 rounded-md">
// //                                 {number}
// //                             </button>
// //                         </li>
// //                     ))}
// //                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
// //                         <button onClick={handleNextPage} disabled={currentPage === npage} className="bg-blue-500 text-white p-2 rounded-r-md">
// //                             Next
// //                         </button>
// //                     </li>
// //                 </ul>
// //             </nav>
// //         </div>
// //     );
// // }

// // export default Products;






// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import { MdOutlineArrowDropDown } from "react-icons/md";

// function Products() {
//     const { filteredProducts, handleCategoryChange } = useAppContext();
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 5;

//     // Calculate pagination
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = filteredProducts.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(filteredProducts.length / recordsPerPage);
//     const numbers = [...Array(npage).keys()].map(num => num + 1);

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/allproducts');
//                 const products = response.data;
//                 const uniqueCategories = [...new Set(products.map(product => product.category))];
//                 setCategories(['All', ...uniqueCategories]);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDropdownChange = (event) => {
//         handleCategoryChange(event.target.value);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
//             setCurrentPage(1); 
            
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleNextPage = () => {
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="p-5">
//             <h1 className="text-2xl font-bold mb-4">Product List</h1>
//             <div className="flex justify-between mb-4">
//                 <div className="flex items-center">
//                     <label className="mr-2 font-semibold">Filter by Category:</label>
//                     <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2">
//                         {categories.map((category, index) => (
//                             <option key={index} value={category}>
//                                 {category}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 font-semibold">
//                     Filter <MdOutlineArrowDropDown />
//                 </button>
//             </div>

//             <table className="min-w-full border border-gray-300">
//                 <thead className="bg-slate-100">
//                     <tr>
//                         {/* <th className="bg-blue-400 p-3 font-bold">Image</th> */}
//                         <th className="bg-blue-400 p-3 font-bold">Product Name</th>
//                         {/* <th className="bg-blue-400 p-3 font-bold">Category</th> */}
//                         {/* <th className="bg-blue-400 p-3 font-bold">Description</th> */}
//                         <th className="bg-blue-400 p-3 font-bold">Product Price</th>
//                         <th className="bg-blue-400 p-3 font-bold">SKU</th>
//                         <th className="bg-blue-400 p-3 font-bold">No.Of stock</th>
//                         <th className="bg-blue-400 p-3 font-bold">In Stock/ Out stock</th>
//                         {/* <th className="bg-blue-400 p-3 font-bold">GST</th>
//                         <th className="bg-blue-400 p-3 font-bold">Edit</th>
//                         <th className="bg-blue-400 p-3 font-bold">Delete</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {records.map(product => (
//                         <tr key={product._id} className="text-center border-b">
//                             {/* <td>
//                                 <Image
//                                     src={product.image}
//                                     alt='image'
//                                     height={50}
//                                     width={50}
//                                     className="mx-auto"
//                                 />
//                             </td> */}
//                             <td>{product.name}</td>
//                             {/* <td>{product.category}</td> */}
//                             {/* <td>{product.description}</td> */}
//                             <td>${product.finalPrice}</td>
//                             <td>{product.sku}</td>
//                             <td>{product.stock}</td>
//                             <td>
//                                 {product.stock > 0 ? 
//                                     <span className="text-green-500">In Stock</span> : 
//                                     <span className="text-red-500">Out of Stock</span>
//                                 }
//                             </td>
//                             {/* <td>{product.gst}%</td>
//                             <td>
//                                 <Link href={`/edit/${product._id}`} className="text-blue-500">Edit</Link>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(product._id)} className="text-red-500">Delete</button>
//                             </td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <nav className="mt-4">
//                 <ul className="flex justify-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded-l-md">
//                             Previous
//                         </button>
//                     </li>
//                     {numbers.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button onClick={() => handlePageChange(number)} className="bg-blue-500 text-white p-2 mx-1 rounded-md">
//                                 {number}
//                             </button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
//                         <button onClick={handleNextPage} disabled={currentPage === npage} className="bg-blue-500 text-white p-2 rounded-r-md">
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Products;




// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import { MdOutlineArrowDropDown } from "react-icons/md";

// function Products() {
//     const { filteredProducts, handleCategoryChange } = useAppContext();
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 5;

//     // Calculate pagination
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = filteredProducts.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(filteredProducts.length / recordsPerPage);
//     const numbers = [...Array(npage).keys()].map(num => num + 1);

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/allproducts');
//                 const products = response.data;
//                 const uniqueCategories = [...new Set(products.map(product => product.category))];
//                 setCategories(['All', ...uniqueCategories]);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDropdownChange = (event) => {
//         handleCategoryChange(event.target.value);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
//             setCurrentPage(1); 
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleNextPage = () => {
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="p-5">
//             <h1 className="text-2xl font-bold mb-4">Product List</h1>
//             <div className="flex justify-between mb-4">
//                 <div className="flex items-center">
//                     <label className="mr-2 font-semibold">Filter by Category:</label>
//                     <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2">
//                         {categories.map((category, index) => (
//                             <option key={index} value={category}>
//                                 {category}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 font-semibold">
//                     Filter <MdOutlineArrowDropDown />
//                 </button>
//             </div>
// <div className=" border-gray-300">
//             <table className="min-w-full  border-gray-300">
//                 <thead className="bg-slate-100">
//                     <tr className=' text-center flex items-center justify-between gap-2'>
//                         <th className="bg-blue-400 p-3 font-bold rounded-tl-md rounded-tr-md">Product Name</th>
//                         <th className="bg-blue-400 p-3 font-bold">Product Price</th>
//                         <th className="bg-blue-400 p-3 font-bold">SKU</th>
//                         <th className="bg-blue-400 p-3 font-bold">No. Of Stock</th>
//                         <th className="bg-blue-400 p-3 font-bold rounded-bl-md rounded-br-md">In Stock / Out of Stock</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {records.map(product => (
//                         <tr key={product._id} className="text-center flex items-center justify-between gap-2">
//                             <td className="p-3  border-gray-200 rounded-md">{product.name}</td>
//                             <td className="p-3  border-gray-200 rounded-md">${product.finalPrice}</td>
//                             <td className="p-3  border-gray-200 rounded-md">{product.sku}</td>
//                             <td className="p-3  border-gray-200 rounded-md">{product.stock}</td>
//                             <td className="p-3 border-gray-200 rounded-md">
//                                 {product.stock > 0 ? 
//                                     <span className="text-green-500">In Stock</span> : 
//                                     <span className="text-red-500">Out of Stock</span>
//                                 }
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
// </div>
//             <nav className="mt-4">
//                 <ul className="flex justify-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded-l-md">
//                             Previous
//                         </button>
//                     </li>
//                     {numbers.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button onClick={() => handlePageChange(number)} className="bg-blue-500 text-white p-2 mx-1 rounded-md">
//                                 {number}
//                             </button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
//                         <button onClick={handleNextPage} disabled={currentPage === npage} className="bg-blue-500 text-white p-2 rounded-r-md">
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Products;




// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import { MdOutlineArrowDropDown } from "react-icons/md";

// function Products() {
//     const { filteredProducts, handleCategoryChange, productStats } = useAppContext();
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 5;

//     // Calculate pagination
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = filteredProducts.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(filteredProducts.length / recordsPerPage);
//     const numbers = [...Array(npage).keys()].map(num => num + 1);


//     const [displayValue, setDisplayValue] = useState('');

//     const handleInStockClick = () => {
//       setDisplayValue(productStats.inStock);
//     };
  
//     const handleOutOfStockClick = () => {
//       setDisplayValue(productStats.outOfStock);
//     };

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/allproducts');
//                 const products = response.data;
//                 const uniqueCategories = [...new Set(products.map(product => product.category))];
//                 setCategories(['All', ...uniqueCategories]);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDropdownChange = (event) => {
//         handleCategoryChange(event.target.value);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
//             setCurrentPage(1); 
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleNextPage = () => {
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="p-5 ">
//               <div className="flex justify-center gap-4 pb-5">
//         <div className="bg-blue-600 flex justify-center items-center rounded-xl flex-col  text-white p-3 w-full max-w-xs" style={{height:'145', width:'250'}}>
//           <h1 className=" text-base  font-bold">Total Products</h1>
//           <h1 className=" text-4xl font-extrabold">{productStats.totalProducts}</h1>
//         </div>
//         <div className="bg-blue-600 flex justify-center items-center flex-col text-4xl font-extrabold text-white p-3 w-full max-w-xs rounded-xl" style={{height:'145', width:'250'}}>
//           <h1 className="text-base font-bold">Total Categories</h1>
//           <h1 className="block  rounded-2xl text-white  p-1 text-4xl font-extrabold">{productStats.totalCategories}</h1>
//         </div>
//         {/* <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 rounded-xl w-full max-w-xs"style={{height:'145', width:'250'}}>
//           <h1 className="text-base font-bold">Products</h1>
//           <div className="flex justify-center gap-4">
//             <span className="block text-sm rounded-2xl bg-white text-blue-600 p-1 font-bold">In Stock</span>
//             <span className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold">Out of Stock</span>
//           </div>
//           <div className="flex justify-center gap-4 pb-4 items-center mr-8">
//             <h1 className="block  rounded-2xl text-white  p-1 text-4xl font-extrabold"> {productStats.inStock} {productStats.outOfStock}</h1>
//             {/* <h1 className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold">{productStats.inStock} {productStats.outOfStock}</h1> */}
//           {/* </div> */}
        
//         {/* </div> */}

//         <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 rounded-xl w-full max-w-xs"style={{height:'145', width:'250'}}>
//       <h1 className="text-base font-bold">Products</h1>
//       <div className="flex justify-center gap-4 mb-2">
//         <span
//           className="block text-sm rounded-2xl bg-white text-blue-600 p-1 font-bold cursor-pointer"
//           onClick={handleInStockClick}
//         >
//           In Stock
//         </span>
//         <span
//           className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold cursor-pointer"
//           onClick={handleOutOfStockClick}
//         >
//           Out of Stock
//         </span>
//       </div>
//       <div className="flex justify-center items-center">
//         <h1 className="block text-white text-4xl font-extrabold">{displayValue || productStats.inStock}</h1>
//       </div>
//     </div>
   
// <div className="relative inline-block mt-2">
//     <button 
//        className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 mt-20 font-semibold"
//         style={{ height: '40px', width: 'auto' }} 
//         onClick={() => document.getElementById('categorySelect').classList.toggle('hidden')}
//     >
//         Filter <MdOutlineArrowDropDown />
//     </button>
//     <div id="categorySelect" className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md hidden">
//         {categories.map((category, index) => (
//             <button 
//                 key={index} 
//                 className="w-full text-left p-2 hover:bg-blue-100" 
//                 onClick={() => {
//                     handleDropdownChange({ target: { value: category } });
//                     document.getElementById('categorySelect').classList.add('hidden');
//                 }}
//             >
//                 {category}
//             </button>
//         ))}
//     </div>
// </div>

//       </div>
           
           

// <div className="overflow-x-auto bg-slate-100 p-10 ">
//                 <table className="min-w-full bg-slate-100 p-6">
//                     <thead className="bg-slate-100">
//                         <tr className="flex justify-between items-center gap-2">
//                             <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">Product Name</th>
//                             <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">Product Price</th>
//                             <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">SKU</th>
//                             <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">No. Of Stock</th>
//                             <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">In Stock / Out of Stock</th>
//                         </tr>
//                     </thead>
//                     <tbody className=''>
//                         {records.map(product => (
//                             <tr key={product._id} className="flex justify-between items-center gap-2">
//                                 <td className=" p-3  rounded-lg">{product.name}</td>
//                                 <td className=" p-3 rounded-lg ">${product.finalPrice}</td>
//                                 <td className=" p-3  rounded-lg">{product.sku}</td>
//                                 <td className=" p-3  rounded-lg ">{product.stock}</td>
//                                 <td className=" p-3  rounded-lg">
//                                     {product.stock > 0 ? 
//                                         <span className="text-green-500">In Stock</span> : 
//                                         <span className="text-red-500">Out of Stock</span>
//                                     }
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <nav className="mt-4">
//                 <ul className="flex justify-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded-l-md">
//                             Previous
//                         </button>
//                     </li>
//                     {numbers.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button onClick={() => handlePageChange(number)} className="bg-blue-500 text-white p-2 mx-1 rounded-md">
//                                 {number}
//                             </button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
//                         <button onClick={handleNextPage} disabled={currentPage === npage} className="bg-blue-500 text-white p-2 rounded-r-md">
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Products;
