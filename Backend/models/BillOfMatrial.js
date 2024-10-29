

const mongoose = require("mongoose");

const BOMSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    singleProduct: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
    },   orderDate: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Cancelled', 'WIP'], 
        default: 'Pending' 
    },
    orderDate: { type: Date, default: Date.now }
});

const BillOfMaterial = mongoose.model('BOM', BOMSchema);

module.exports = BillOfMaterial;
