// const mongoose = require('mongoose');

// // Product Schema
// const ProductSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     sku: { type: String, required: true }, // Changed to String for SKU
//     gst: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     ventorId:{type:Number,required:true},
//     godown:{type:String,required:false},
//     reorderPoint:{type:String,required:true},
//     date: { type: Date, default: Date.now },
//     available: { type: Boolean, default: true },
//     finalPrice: { type: Number } // Store final price

// });

// // Create Product model
// const Product = mongoose.model('Product', ProductSchema);

// module.exports = Product;




const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    gst: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Object, required: true }, // { covai: Number, ooty: Number, ... }
    ventorId: { type: Number, required: true },
    reorderPoints: { type: Object, required: true }, // { covai: Number, ooty: Number, ... }
    finalPrice: { type: Number, required: true },
    totalStockValue: { type: Number, default: 0 }, // New field for total stock value
}, { timestamps: true });

productSchema.methods.calculateTotalStockValue = function () {
    const totalValue = Object.entries(this.stock).reduce((total, [godown, quantity]) => {
        return total + Number(quantity);
    }, 0);
    this.totalStockValue = totalValue;
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
