analys this code 
app.post('/addtobill', async (req, res) => {
    try {
        const { productId, productName, productPrice, category, gst,reorderPoint, sku, quantity = 1 } = req.body;

        // Validate required fields
        if (!productId || !productName || !productPrice || !category || !gst || !sku || !reorderPoint) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Find the product by SKU
        const product = await Product.findOne({ sku });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found with the given SKU' });
        }

        // Check if the requested quantity is within the available stock
        // Get the current cart item if it exists
        let cartItem = await Cart.findOne({ sku });

        // Calculate the total quantity in the cart including the new quantity
        const totalQuantityInCart = cartItem ? cartItem.quantity + quantity : quantity;

        // Check if the total quantity in the cart is less than or equal to the product stock
        if (totalQuantityInCart > product.stock) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        if (cartItem) {
            // Product exists in the cart, update its quantity
            cartItem.quantity = totalQuantityInCart; // Update with total quantity
            await cartItem.save();
            res.json({ success: true, message: 'Product quantity updated successfully', cart: cartItem });
        } else {
            // Create a new cart entry
            const cart = new Cart({
                productId: product._id, // Store productId as ObjectId from Product
                productName,
                productPrice,
                category,
                gst,
                quantity,
                reorderPoint,
                sku
            });
            console.log(cart);
            
            await cart.save();
            res.json({ success: true, message: 'Product added to bill successfully', cart });
        }

    } catch (error) {
        console.error('Error adding product to bill:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add product to bill' });
    }
});
and productModel.js is 

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

and the CartModel.js is 

const mongoose=require('mongoose');

const CartModel=new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId, required:true
    },
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    gst:{
        type:Number,
        required:true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity to 1 if not specified
    },
    sku:{
        type:String,
        required:true
    },
    reorderPoint:{
        type:String,required:true
    }
})

const Cart=mongoose.model('billcart',CartModel);

module.exports=Cart;

and rewrite the CartModel.js and app.post('/addtobill'
are correctly get 
productId, productName, productPrice, category, gst,reorderPoint, sku, quantity = 1 

the with add warehouse and which warehouse product selecte and how many quantity 
they are addtobill to reducing dynamically