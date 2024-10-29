// const mongoose=require('mongoose');

// const ManufacturingSchema=mongoose.Schema({
//     ItemName:{
//         type:String,
//         required:true
//     },
//     ItemCategory:{
//         type:String,
//         required:true
//     },
//     stock:{
//         type:Number,
//         required:true
//     },
//     minimumStock:{
//         type:Number,
//         required:true
//     },
//     tobeOrdered:{
//         type:Number,
//         default:0
//     },
//     oldstock:{
//         type:Number,
//         default:0
//     },
//     amount:{
//         type:Number,
//         required:true
//     },
//     date: { type: Date, default: Date.now }
// })

// const ManufacturingAddProduct=mongoose.model('ManufacturingAddProduct',ManufacturingSchema);

// module.exports=ManufacturingAddProduct;



const mongoose = require('mongoose');

const ManufacturingSchema = mongoose.Schema({
    ItemName: {
        type: String,
        required: true,
    },
    ItemCategory: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    minimumStock: {
        type: Number,
        required: true,
    },
    tobeOrdered: {
        type: Number,
        default: 0,
    },
    oldstock: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: { 
        type: Date, 
        default: Date.now,
    },
});

const ManufacturingAddProduct = mongoose.model('ManufacturingAddProduct', ManufacturingSchema);

module.exports = ManufacturingAddProduct;
