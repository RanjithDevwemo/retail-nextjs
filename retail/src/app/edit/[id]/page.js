



// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UploadArea from '@/app/Assets/upload_area.svg';
// import Image from 'next/image';

// export default function EditProduct({ params }) {
//   const [image, setImage] = useState(null);
//   const [productDetails, setProductDetails] = useState({
//     name: '',
//     category: '',
//     price: '',
//     sku: '',
//     ventorId: '',
//     gst: '',
//     description: '',
//     stock: {},
//     reorderPoints: {},
//     godown: 'covai',
//     image: ''
//   });

//   // Fetch product details on mount
//   useEffect(() => {
//     const fetchSingleProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/getproduct/${params.id}`);
//         const product = response.data;

//         setProductDetails({
//           name: product.name,
//           category: product.category,
//           price: product.price,
//           sku: product.sku,
//           ventorId: product.ventorId,
//           gst: product.gst,
//           description: product.description,
//           stock: product.stock || {},
//           reorderPoints: product.reorderPoints || {},
//           godown: 'covai', // Default godown
//           image: product.image,
//         });
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchSingleProduct();
//   }, [params.id]);

//   // Handle input changes
//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Handle image upload
//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Update product details
//   const updateProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (image) {
//       formData.append('product', image);
//     }

//     const updatedProduct = {
//       ...productDetails,
//       image: image ? null : productDetails.image,
//     };

//     // Upload image if a new one is selected
//     if (image) {
//       try {
//         const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         if (imageResponse.data.success) {
//           updatedProduct.image = imageResponse.data.image_url;
//         } else {
//           alert(`Failed to upload image: ${imageResponse.data.message || 'Unknown error'}`);
//           return;
//         }
//       } catch (error) {
//         alert('Error uploading image');
//         return;
//       }
//     }

//     try {
//       const productResponse = await axios.put(`http://localhost:4000/allproduct/${params.id}`, updatedProduct, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (productResponse.data.success) {
//         alert('Product updated successfully.');
//         setImage(null); // Clear image preview
//       } else {
//         alert(`Failed to update product: ${productResponse.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error occurred during product update:', error);
//       alert(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   // Handle stock and reorder point changes
//   const handleStockChange = (e) => {
//     const { value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       stock: {
//         ...prevDetails.stock,
//         [prevDetails.godown]: value,
//       },
//     }));
//   };

//   const handleReorderPointChange = (e) => {
//     const { value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       reorderPoints: {
//         ...prevDetails.reorderPoints,
//         [prevDetails.godown]: value,
//       },
//     }));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
//         <form onSubmit={updateProduct} className="space-y-4">
//           {['name', 'category', 'price', 'sku', 'ventorId', 'gst', 'description'].map((field) => (
//             <div key={field} className="flex flex-col">
//               <label className="font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//               <input
//                 value={productDetails[field]}
//                 onChange={changeHandler}
//                 type={field === 'price' || field === 'gst' ? 'number' : 'text'}
//                 name={field}
//                 placeholder="Type here"
//                 required
//                 className="border border-gray-300 rounded-md p-2"
//               />
//             </div>
//           ))}

//           <div className="flex flex-col mb-4">
//             <label className="font-medium mb-1">Stock in {productDetails.godown}</label>
//             <input
//               value={productDetails.stock[productDetails.godown] || ''}
//               onChange={handleStockChange}
//               type="number"
//               placeholder="Type here"
//               required
//               className="border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           <div className="flex flex-col mb-4">
//             <label className="font-medium mb-1">Reorder Point for {productDetails.godown}</label>
//             <input
//               value={productDetails.reorderPoints[productDetails.godown] || ''}
//               onChange={handleReorderPointChange}
//               type="number"
//               placeholder="Type here"
//               required
//               className="border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           <div className="flex flex-col mb-4">
//             <label>Select Product Added Godown</label>
//             <select
//               name="godown"
//               value={productDetails.godown}
//               onChange={(e) => {
//                 const newGodown = e.target.value;
//                 changeHandler(e);
//                 // Preserve stock and reorder point when changing godown
//                 setProductDetails((prevDetails) => ({
//                   ...prevDetails,
//                   stock: { ...prevDetails.stock, [newGodown]: prevDetails.stock[prevDetails.godown] || '' },
//                   reorderPoints: { ...prevDetails.reorderPoints, [newGodown]: prevDetails.reorderPoints[prevDetails.godown] || '' },
//                 }));
//               }}
//               className="border border-gray-300 rounded-md p-2"
//             >
//               {['covai', 'ooty', 'kerala', 'chennai', 'bangalore'].map((godown) => (
//                 <option key={godown} value={godown}>{godown.charAt(0).toUpperCase() + godown.slice(1)}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col mb-4">
//             <label>Upload Image</label>
//             <label htmlFor="file-input">
//               <Image
//                 src={image ? URL.createObjectURL(image) : productDetails.image || UploadArea}
//                 alt="Upload Area"
//                 className="w-32 h-32 object-cover border border-gray-300 rounded-md cursor-pointer"
//                 height={150}
//                 width={150}
//               />
//             </label>
//             <input
//               type="file"
//               onChange={imageHandler}
//               name="image"
//               id="file-input"
//               hidden
//             />
//           </div>

//           <button className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" type="submit">
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }













'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadArea from '@/app/Assets/upload_area.svg';
import Image from 'next/image';

export default function EditProduct({ params }) {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    sku: '',
    ventorId: '',
    gst: '',
    description: '',
    stock: {},
    reorderPoints: {},
    godown: 'covai',
    image: ''
  });

  // Fetch product details on mount
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getproduct/${params.id}`);
        const product = response.data;

        setProductDetails({
          name: product.name,
          category: product.category,
          price: product.price,
          sku: product.sku,
          ventorId: product.ventorId,
          gst: product.gst,
          description: product.description,
          stock: product.stock || {},
          reorderPoints: product.reorderPoints || {},
          godown: 'covai', // Default godown
          image: product.image,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchSingleProduct();
  }, [params.id]);

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image upload
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Update product details
  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('product', image);
    }

    const updatedProduct = {
      ...productDetails,
      image: image ? null : productDetails.image,
    };

    // Upload image if a new one is selected
    if (image) {
      try {
        const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (imageResponse.data.success) {
          updatedProduct.image = imageResponse.data.image_url;
        } else {
          alert(`Failed to upload image: ${imageResponse.data.message || 'Unknown error'}`);
          return;
        }
      } catch (error) {
        alert('Error uploading image');
        return;
      }
    }

    try {
      const productResponse = await axios.put(`http://localhost:4000/allproduct/${params.id}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (productResponse.data.success) {
        alert('Product updated successfully.');
        setImage(null); // Clear image preview
      } else {
        alert(`Failed to update product: ${productResponse.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during product update:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
        <form onSubmit={updateProduct} className="space-y-4">
          {['name', 'category', 'price', 'sku', 'ventorId', 'gst', 'description'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                value={productDetails[field]}
                onChange={changeHandler}
                type={field === 'price' || field === 'gst' ? 'number' : 'text'}
                name={field}
                placeholder="Type here"
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-4">Warehouse Stock & Reorder Points</h3>
          <table className="min-w-full mt-2 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Godown</th>
                <th className="border border-gray-300 p-2">Stock</th>
                <th className="border border-gray-300 p-2">Reorder Point</th>
              </tr>
            </thead>
            <tbody>
              {['covai', 'ooty', 'kerala', 'chennai', 'bangalore'].map((godown) => (
                <tr key={godown}>
                  <td className="border border-gray-300 p-2">{godown.charAt(0).toUpperCase() + godown.slice(1)}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      value={productDetails.stock[godown] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProductDetails((prevDetails) => ({
                          ...prevDetails,
                          stock: {
                            ...prevDetails.stock,
                            [godown]: value,
                          },
                        }));
                      }}
                      type="number"
                      placeholder="Stock"
                      className="border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      value={productDetails.reorderPoints[godown] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProductDetails((prevDetails) => ({
                          ...prevDetails,
                          reorderPoints: {
                            ...prevDetails.reorderPoints,
                            [godown]: value,
                          },
                        }));
                      }}
                      type="number"
                      placeholder="Reorder Point"
                      className="border border-gray-300 rounded-md p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col mb-4">
            <label>Upload Image</label>
            <label htmlFor="file-input">
              <Image
                src={image ? URL.createObjectURL(image) : productDetails.image || UploadArea}
                alt="Upload Area"
                className="w-32 h-32 object-cover border border-gray-300 rounded-md cursor-pointer"
                height={150}
                width={150}
              />
            </label>
            <input
              type="file"
              onChange={imageHandler}
              name="image"
              id="file-input"
              hidden
            />
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
