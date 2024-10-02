
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadArea from '@/app/Assets/upload_area.svg';
import Image from 'next/image';

export default function App({ params }) {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    ventorId: '',
    godown: 'covai',
    sku: '',
    gst: '',
    description: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getsingleproduct/${params.id}`);
      const product = response.data.findProduct; // Accessing the product object
      console.log(product);

      // Assuming product has the same structure as productDetails
      setProductDetails({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        ventorId: product.ventorId,
        godown: product.godown,
        sku: product.sku,
        gst: product.gst,
        description: product.description,
      });
      // Set the image state if available
      setImage(product.image); // Use the existing image URL
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product', image);

      const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (imageResponse.data.success) {
        const product = {
          ...productDetails,
          image: imageResponse.data.image_url || product.image, // Use uploaded image URL or keep the existing
        };

        const productResponse = await axios.put(`http://localhost:4000/allproduct/${params.id}`, product, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (productResponse.data.success) {
          alert(`Product updated successfully.`);
          console.log('Updated Product Details:', productResponse.data.product);
          fetchSingleProduct(); // Refresh the product details
          setImage(null); // Clear image preview
        } else {
          alert(`Failed to update product: ${productResponse.data.message || 'Unknown error'}`);
        }
      } else {
        alert(`Failed to upload image: ${imageResponse.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during product update:', error.response ? error.response.data : error.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <div className="add-product">
      <form onSubmit={updateProduct}>
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <input
            value={productDetails.category}
            onChange={changeHandler}
            type="text"
            name="category"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product Price</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="number"
            name="price"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product SKU</p>
          <input
            value={productDetails.sku}
            onChange={changeHandler}
            type="text"
            name="sku"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product Description</p>
          <textarea
            name="description"
            value={productDetails.description}
            onChange={changeHandler}
            placeholder="Enter Description"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product Stock</p>
          <input
            value={productDetails.stock}
            onChange={changeHandler}
            type="number"
            name="stock"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Ventor Id:</p>
          <input
            value={productDetails.ventorId}
            onChange={changeHandler}
            type="number"
            name="ventorId"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Select Product Added Godown</p>
          <select name="godown" value={productDetails.godown} onChange={changeHandler}>
            <option value="covai">covai</option>
            <option value="ooty">Ooty</option>
            <option value="kerala">Kerala</option>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <p>Product GST (%)</p>
          <input
            value={productDetails.gst}
            onChange={changeHandler}
            type="number"
            name="gst"
            placeholder="Enter GST"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            {/* <Image
              src={image ? URL.createObjectURL(image) : productDetails.image || UploadArea}
              alt="Upload Area"
              className="addproduct-thumbnail-image"
              height={150}
              width={150}
            /> */}

{/* <img
              src={image?image:UploadArea}
              alt="Upload Area"
              className="addproduct-thumbnail-image"
              height={150}
              width={150}
            /> */}
              <Image
              src={image ? image : UploadArea}
            
              alt="Upload Area"
              className="addproduct-thumbnail-image"
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

        <button className="addproduct-btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}














