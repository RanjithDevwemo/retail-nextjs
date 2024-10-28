// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     cartItems: [{
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ManufacturingProducts', required: true },
//         ItemName: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         amount: { type: Number, required: true }
//     }],
//     orderDate: { type: Date, default: Date.now }
// });

// const  ManuFacturingOrder = mongoose.model('Order', OrderSchema);

// module.exports = ManuFacturingOrder;




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
