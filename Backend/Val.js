analys this code 

app.get('/api/order',async (req,res)=>{
    try{
        const getOrders=await ManufacturingOrder.find({});
        res.json({success:true,message:getOrders})
    }catch(error){
        res.json({success:false,message:"server Error : ",error});
        console.log("server error ");   
    }
})
and the model schema value is 


const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cartItems: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ManufacturingProducts', required: true },
        ItemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        amount: { type: Number, required: true }
    }],
    orderDate: { type: Date, default: Date.now }
});

// Use a more consistent naming convention for the model
const ManufacturingOrder = mongoose.model('ManufacturingOrder', OrderSchema);

module.exports = ManufacturingOrder;
and the json value is 

{
    "success": true,
    "message": [
      {
        "_id": "671f9fc0e5e662d613ce2b4c",
        "username": "User123",
        "phoneNumber": "123-456-7890",
        "cartItems": [
          {
            "productId": "671f7bcc4cdd02ebbfb58276",
            "ItemName": "pro-1",
            "quantity": 2,
            "amount": 1500,
            "_id": "671f9fc0e5e662d613ce2b4d"
          },
          {
            "productId": "671f7bfb4cdd02ebbfb58278",
            "ItemName": "Laptop",
            "quantity": 1,
            "amount": 30000,
            "_id": "671f9fc0e5e662d613ce2b4e"
          }
        ],
        "orderDate": "2024-10-28T14:29:20.586Z",
        "__v": 0
      },
      {
        "_id": "671fa23be5e662d613ce33e3",
        "username": "User123",
        "phoneNumber": "123-456-7890",
        "cartItems": [
          {
            "productId": "671f7bcc4cdd02ebbfb58276",
            "ItemName": "pro-1",
            "quantity": 2,
            "amount": 1500,
            "_id": "671fa23be5e662d613ce33e4"
          },
          {
            "productId": "671f7bfb4cdd02ebbfb58278",
            "ItemName": "Laptop",
            "quantity": 1,
            "amount": 30000,
            "_id": "671fa23be5e662d613ce33e5"
          }
        ],
        "orderDate": "2024-10-28T14:39:55.626Z",
        "__v": 0
      },
      {
        "_id": "67206271549d8f46ca37680f",
        "username": "manufaturing",
        "phoneNumber": "7806872931",
        "cartItems": [
          {
            "productId": "671f7c2c4cdd02ebbfb5827a",
            "ItemName": "note",
            "quantity": 2,
            "amount": 40,
            "_id": "67206271549d8f46ca376810"
          },
          {
            "productId": "671f7bcc4cdd02ebbfb58276",
            "ItemName": "pro-1",
            "quantity": 2,
            "amount": 1500,
            "_id": "67206271549d8f46ca376811"
          },
          {
            "productId": "671f7bfb4cdd02ebbfb58278",
            "ItemName": "Laptop",
            "quantity": 2,
            "amount": 30000,
            "_id": "67206271549d8f46ca376812"
          }
        ],
        "orderDate": "2024-10-29T04:20:01.253Z",
        "__v": 0
      }
    ]
  }

  rewrite code and model add status value [getParsedCommandLineOfConfigFile,complited,canceled,WIP(work in progress)]
  default value is pending