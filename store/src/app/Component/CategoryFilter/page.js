
// // // // 'use client'
// // // // import React, {  useState, useEffect } from 'react';
// // // // import { useAppContext } from '@/app/Context'
// // // // import '@/app/Component/CategoryFilter/CategoryFilter.css'

// // // // export default function CategoryFilter() {
// // // //     const { products, setFilteredProducts } = useAppContext();

// // // //     // State to store selected categories
// // // //     const [selectedCategories, setSelectedCategories] = useState([]);

// // // //     // Extract categories and remove duplicates
// // // //     const uniqueCategories = React.useMemo(() => {
// // // //         if (!products || products.length === 0) {
// // // //             return [];
// // // //         }
// // // //         const categories = products.map(product => product.category);
// // // //         return [...new Set(categories)];
// // // //     }, [products]);

// // // //     // Handler for checkbox change
// // // //     const handleCheckboxChange = (category) => {
// // // //         setSelectedCategories(prevState =>
// // // //             prevState.includes(category)
// // // //                 ? prevState.filter(cat => cat !== category)
// // // //                 : [...prevState, category]
// // // //         );
// // // //     };

// // // //     // Update filtered products based on selected categories
// // // //     useEffect(() => {
// // // //         if (selectedCategories.length === 0) {
// // // //             // No category selected, show all products
// // // //             setFilteredProducts(products);
// // // //         } else {
// // // //             // Filter products based on selected categories
// // // //             const filtered = products.filter(product =>
// // // //                 selectedCategories.includes(product.category)
// // // //             );
// // // //             setFilteredProducts(filtered);
// // // //         }
// // // //     }, [selectedCategories, products, setFilteredProducts]);

// // // //   //total amount of this page

// // // //     return (
// // // //         <div className='main-category'>
// // // //         <div className='category-filter'>
// // // //             <h1>Categories</h1>
// // // //             <ul>
// // // //                 <li>
// // // //                     <input
// // // //                         type="checkbox"
// // // //                         id="allItems"
// // // //                         checked={selectedCategories.length === uniqueCategories.length}
// // // //                         onChange={() => {
// // // //                             if (selectedCategories.length === uniqueCategories.length) {
// // // //                                 setSelectedCategories([]);
// // // //                             } else {
// // // //                                 setSelectedCategories(uniqueCategories);
// // // //                             }
// // // //                         }}
// // // //                     />
// // // //                     <label htmlFor="allItems">All Items</label>
// // // //                 </li>
// // // //                 {uniqueCategories.map((category, index) => (
// // // //                     <li key={index}>
// // // //                         <input
// // // //                             type="checkbox"
// // // //                             id={category}
// // // //                             checked={selectedCategories.includes(category)}
// // // //                             onChange={() => handleCheckboxChange(category)}
// // // //                         />
// // // //                         <label htmlFor={category}>{category}</label>
// // // //                     </li>
// // // //                 ))}
// // // //             </ul>
// // // //         </div>
// // // //         </div>
// // // //     );
// // // // }



// // // // 'use client';
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAppContext } from '@/app/Context';
// // // // import '@/app/Component/CategoryFilter/CategoryFilter.css';

// // // // export default function CategoryFilter() {
// // // //     const { products, setFilteredProducts } = useAppContext();
// // // //     const [selectedCategories, setSelectedCategories] = useState([]);

// // // //     // Extract unique categories
// // // //     const uniqueCategories = React.useMemo(() => {
// // // //         if (!products || products.length === 0) {
// // // //             return [];
// // // //         }
// // // //         const categories = products.map(product => product.category);
// // // //         return [...new Set(categories)];
// // // //     }, [products]);

// // // //     // Update filtered products based on selected categories
// // // //     useEffect(() => {
// // // //         if (selectedCategories.length === 0) {
// // // //             setFilteredProducts(products);
// // // //         } else {
// // // //             const filtered = products.filter(product =>
// // // //                 selectedCategories.includes(product.category)
// // // //             );
// // // //             setFilteredProducts(filtered);
// // // //         }
// // // //     }, [selectedCategories, products, setFilteredProducts]);

// // // //     // Handle category selection
// // // //     const handleCheckboxChange = (category) => {
// // // //         setSelectedCategories(prevState =>
// // // //             prevState.includes(category)
// // // //                 ? prevState.filter(cat => cat !== category)
// // // //                 : [...prevState, category]
// // // //         );
// // // //     };

// // // //     return (
// // // //         <div className='main-category'>
// // // //             <div className='category-filter'>
// // // //                 <h1>Categories</h1>
// // // //                 <div
// // // //                     className={`category-item ${selectedCategories.length === uniqueCategories.length ? 'active' : ''}`}
// // // //                     onClick={() => {
// // // //                         if (selectedCategories.length === uniqueCategories.length) {
// // // //                             setSelectedCategories([]);
// // // //                         } else {
// // // //                             setSelectedCategories(uniqueCategories);
// // // //                         }
// // // //                     }}
// // // //                 >
// // // //                     <input
// // // //                         type="checkbox"
// // // //                         id="allItems"
// // // //                         checked={selectedCategories.length === uniqueCategories.length}
// // // //                         onChange={() => {}}
// // // //                     />
// // // //                     <label htmlFor="allItems">All Items</label>
// // // //                 </div>
// // // //                 {uniqueCategories.map((category, index) => (
// // // //                     <div key={index} className={`category-item ${selectedCategories.includes(category) ? 'active' : ''}`}>
// // // //                         <input
// // // //                             type="checkbox"
// // // //                             id={category}
// // // //                             checked={selectedCategories.includes(category)}
// // // //                             onChange={() => handleCheckboxChange(category)}
// // // //                         />
// // // //                         <label htmlFor={category}>{category}</label>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }




// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useAppContext } from '@/app/Context';

// // export default function CategoryFilter() {
// //     const { products, setFilteredProducts } = useAppContext();
// //     const [selectedCategories, setSelectedCategories] = useState([]);

// //     const uniqueCategories = React.useMemo(() => {
// //         if (!products || products.length === 0) {
// //             return [];
// //         }
// //         const categories = products.map(product => product.category);
// //         return [...new Set(categories)];
// //     }, [products]);

// //     useEffect(() => {
// //         if (selectedCategories.length === 0) {
// //             setFilteredProducts(products);
// //         } else {
// //             const filtered = products.filter(product =>
// //                 selectedCategories.includes(product.category)
// //             );
// //             setFilteredProducts(filtered);
// //         }
// //     }, [selectedCategories, products, setFilteredProducts]);

// //     const handleCheckboxChange = (category) => {
// //         setSelectedCategories(prevState =>
// //             prevState.includes(category)
// //                 ? prevState.filter(cat => cat !== category)
// //                 : [...prevState, category]
// //         );
// //     };

// //     return (
// //         <div>
// //             <h1 className="text-xl font-bold mb-4">Categories</h1>
// //             <div
// //                 className={`flex items-center p-2 cursor-pointer transition-all duration-300 ${selectedCategories.length === uniqueCategories.length ? 'bg-white text-black font-bold' : ''}`}
// //                 onClick={() => {
// //                     if (selectedCategories.length === uniqueCategories.length) {
// //                         setSelectedCategories([]);
// //                     } else {
// //                         setSelectedCategories(uniqueCategories);
// //                     }
// //                 }}
// //             >
// //                 <input
// //                     type="checkbox"
// //                     id="allItems"
// //                     checked={selectedCategories.length === uniqueCategories.length}
// //                     onChange={() => {}}
// //                     className="mr-2"
// //                 />
// //                 <label htmlFor="allItems">All Items</label>
// //             </div>
// //             {uniqueCategories.map((category, index) => (
// //                 <div key={index} className={`flex items-center p-2 cursor-pointer transition-all duration-300 ${selectedCategories.includes(category) ? 'bg-white text-black font-bold' : ''}`}>
// //                     <input
// //                         type="checkbox"
// //                         id={category}
// //                         checked={selectedCategories.includes(category)}
// //                         onChange={() => handleCheckboxChange(category)}
// //                         className="mr-2"
// //                     />
// //                     <label htmlFor={category}>{category}</label>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // }







// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAppContext } from '@/app/Context';

// export default function CategoryFilter() {
//     const { products, setFilteredProducts } = useAppContext();
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const uniqueCategories = React.useMemo(() => {
//         if (!products || products.length === 0) {
//             return [];
//         }
//         const categories = products.map(product => product.category);
//         return [...new Set(categories)];
//     }, [products]);

//     useEffect(() => {
//         if (selectedCategory) {
//             const filtered = products.filter(product =>
//                 product.category === selectedCategory
//             );
//             setFilteredProducts(filtered);
//         } else {
//             setFilteredProducts(products);
//         }
//     }, [selectedCategory, products, setFilteredProducts]);

//     const handleButtonClick = (category) => {
//         setSelectedCategory(prevCategory =>
//             prevCategory === category ? null : category
//         );
//     };

//     return (
//         <div className='mr-20'>
//             <h1 className="text-xl font-bold mb-4 ">Categories</h1>
//             {uniqueCategories.map((category, index) => (
//                 <button
//                     key={index}
//                     onClick={() => handleButtonClick(category)}
//                     className={` p-2 rounded-lg mb-2 w-full transition-all duration-300 ${selectedCategory === category ? 'bg-white text-black ' : ' bg-blue-600 text-white hover:bg-slate-50 hover:text-black'}`}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>
//     );
// }



'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/app/Context';

export default function CategoryFilter() {
    const { products, setFilteredProducts } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const uniqueCategories = React.useMemo(() => {
        if (!products || products.length === 0) {
            return [];
        }
        const categories = products.map(product => product.category);
        return [...new Set(categories)];
    }, [products]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product =>
                product.category === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products, setFilteredProducts]);

    const handleButtonClick = (category) => {
        setSelectedCategory(prevCategory =>
            prevCategory === category ? null : category
        );
    };

    return (
        <div className='mr-4 sm:mr-8'>
            <h1 className="text-lg sm:text-xl font-bold mb-4">Categories</h1>
            {uniqueCategories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(category)}
                    className={`p-2 rounded-lg mb-2 w-full transition-all duration-300 text-sm sm:text-base ${selectedCategory === category ? 'bg-white text-black' : 'bg-blue-600 text-white hover:bg-slate-50 hover:text-black'}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
