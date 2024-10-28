this is all product model.js
const mongoose=require('mongoose');

const ManufacturingSchema=mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    ItemCategory:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    minimumStock:{
        type:Number,
        required:true
    },
    tobeOrdered:{
        type:Number,
        default:0
    },
    amount:{
        type:Number,
        required:true
    },
    date: { type: Date, default: Date.now }
})

const ManufacturingAddProduct=mongoose.model('ManufacturingAddProduct',ManufacturingSchema);

module.exports=ManufacturingAddProduct; 
and product add is middleware is 
app.post("/api/manufacturingAdd",async(req,res)=>{
    try{
        const {ItemName,ItemCategory,stock,minimumStock,amount}=req.body;
       if(!ItemName||!ItemCategory||!stock||!minimumStock||!amount){
        return res.json({ success: false, message: "name, quantity, unit, and singleProduct are required" });
       } 
       //create the manufaturing products
       let addManufacturingProducts=new ManufacturingProducts({ItemName,ItemCategory,stock,minimumStock,amount});

       //Save in Database
       await addManufacturingProducts.save();
       res.json({success:true,message:"product added successfully",data:addManufacturingProducts});
    }catch(error){
res.json({success:false,message:"server error : ",error});
    }
})
and the get product values is 
app.get('/api/manufacturingAdd',async (req,res)=>{
    try{
        let val=await ManufacturingProducts.find({});

        res.json({success:true,message:"fetching all products ",data:val});
    }catch(error){
        res.json({success:false,message:"server error : ",error});
    }
}) 
the json values are 
{
    "success": true,
    "message": "fetching all products ",
    "data": [
      {
        "_id": "671f7bcc4cdd02ebbfb58276",
        "ItemName": "pro-1",
        "ItemCategory": "Phone",
        "stock": 15,
        "minimumStock": 5,
        "tobeOrdered": 0,
        "amount": 1500,
        "date": "2024-10-28T11:55:56.443Z",
        "__v": 0
      },
      {
        "_id": "671f7bfb4cdd02ebbfb58278",
        "ItemName": "Laptop",
        "ItemCategory": "Electronic",
        "stock": 10,
        "minimumStock": 3,
        "tobeOrdered": 0,
        "amount": 30000,
        "date": "2023-08-28T11:56:43.494Z",
        "__v": 0
      },
      {
        "_id": "671f7c2c4cdd02ebbfb5827a",
        "ItemName": "note",
        "ItemCategory": "stationery",
        "stock": 100,
        "minimumStock": 15,
        "tobeOrdered": 0,
        "amount": 40,
        "date": "2024-10-28T11:57:32.909Z",
        "__v": 0
      },
      {
        "_id": "671f7c414cdd02ebbfb5827c",
        "ItemName": "Pencil",
        "ItemCategory": "stationery",
        "stock": 70,
        "minimumStock": 20,
        "tobeOrdered": 30,
        "amount": 4,
        "date": "2023-10-25T11:57:53.048Z",
        "__v": 0
      }
    ]
  }
  write addtocart model and middle ware and frontend code also 
  'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManufacturingProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/manufacturingAdd');
                if (response.data.success) {
                    setProducts(response.data.data); // Set all products directly
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Manufacturing Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">{product.ItemName}</h2>
                        <p className="text-gray-700">Stock: {product.stock}</p>
                        <p className="text-gray-700">Amount: ${product.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManufacturingProductList;

onclick single product to store pass id ,ItemName,stock,amount