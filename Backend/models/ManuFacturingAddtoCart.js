// const mongoose = require('mongoose');

// const CartSchema = mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'ManufacturingAddProduct'
//     },
//     ItemName: {
//         type: String,
//         required: true
//     },
//     stock: {
//         type: Number,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     dateAdded: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// const ManufacturingCart = mongoose.model('CartManufacturing', CartSchema);

// module.exports = ManufacturingCart;


const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ManufacturingAddProduct'
    },
    ItemName: {
        type: String,
        required: true
    },
    quantity: { // Quantity of the product in the cart
        type: Number,
        required: true,
        default: 1 // Default quantity is 1 when added
    },
    amount: {
        type: Number,
        required: true
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const ManufacturingCart = mongoose.model('CartManufacturing', CartSchema);

module.exports = ManufacturingCart;
