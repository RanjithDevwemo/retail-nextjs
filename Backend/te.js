the json value is 
[
    {
      "_id": "670fb8df57974eaa8bd8d3a2",
      "name": "Sample Product update",
      "image": "http://localhost:4000/images/product_1725967083025.jpg",
      "category": "electronics",
      "price": 100,
      "sku": "SKU12345wewq",
      "gst": 18,
      "description": "A great product for testing.",
      "stock": {
        "covai": 50,
        "ooty": 30,
        "kerala": 20,
        "chennai": 10,
        "bangalore": 15
      },
      "ventorId": 123,
      "reorderPoints": {
        "covai": 10,
        "ooty": 5,
        "kerala": 3,
        "chennai": 2,
        "bangalore": 4
      },
      "finalPrice": 118,
      "totalStockValue": 125,
      "createdAt": "2024-10-16T13:00:15.689Z",
      "updatedAt": "2024-10-18T05:37:49.438Z",
      "__v": 0
    },
    {
      "_id": "670fba7757974eaa8bd8d3b0",
      "name": "Sample Product1",
      "image": "http://localhost:4000/images/product_1727264306665.jpg",
      "category": "electronicsww223",
      "price": 14310,
      "sku": "SKU12345q",
      "gst": 18,
      "description": "A great product for testing.",
      "stock": {
        "covai": 50,
        "ooty": 30,
        "kerala": 20,
        "chennai": 10
      },
      "ventorId": 12543,
      "reorderPoints": {
        "covai": 10,
        "ooty": 5,
        "kerala": 3,
        "chennai": 2
      },
      "finalPrice": 16885.8,
      "totalStockValue": 1502550,
      "createdAt": "2024-10-16T13:07:03.389Z",
      "updatedAt": "2024-10-18T05:37:49.604Z",
      "__v": 0
    },
    {
      "_id": "670fbad457974eaa8bd8d3b9",
      "name": "Pencil",
      "image": "http://localhost:4000/images/product_1729249031790.jpg",
      "category": "pen",
      "price": 100,
      "sku": "SKU1",
      "gst": 18,
      "description": "A great product for testing.",
      "stock": {
        "covai": 50,
        "ooty": 30,
        "kerala": "10",
        "undefined": "10"
      },
      "ventorId": 12543,
      "reorderPoints": {
        "covai": 10,
        "ooty": 5,
        "kerala": 3,
        "undefined": "5"
      },
      "finalPrice": 118,
      "totalStockValue": 100,
      "createdAt": "2024-10-16T13:08:36.761Z",
      "updatedAt": "2024-10-17T05:16:13.017Z",
      "__v": 0
    },
    {
      "_id": "67123f074c45c334acc0cd27",
      "name": "note book",
      "image": "http://localhost:4000/images/product_1729249110932.jpg",
      "category": "t-shirt",
      "price": 2000,
      "sku": "sdafsdkkalwed",
      "gst": 18,
      "description": "retail project",
      "stock": {
        "covai": "10",
        "chennai": "50",
        "bangalore": "50"
      },
      "ventorId": 916,
      "reorderPoints": {
        "covai": "5",
        "chennai": "10",
        "bangalore": "20"
      },
      "finalPrice": 2360,
      "totalStockValue": 110,
      "createdAt": "2024-10-18T10:57:11.857Z",
      "updatedAt": "2024-10-18T10:57:11.857Z",
      "__v": 0
    },
    {
      "_id": "67123f564c45c334acc0cd2a",
      "name": "car",
      "image": "http://localhost:4000/images/product_1729249110932.jpg",
      "category": "pen",
      "price": 2000,
      "sku": "adsdwqew",
      "gst": 18,
      "description": "retail project",
      "stock": {
        "kerala": "25",
        "bangalore": "35"
      },
      "ventorId": 1194,
      "reorderPoints": {
        "kerala": "5",
        "bangalore": "10"
      },
      "finalPrice": 2360,
      "totalStockValue": 60,
      "createdAt": "2024-10-18T10:58:30.994Z",
      "updatedAt": "2024-10-18T10:58:30.994Z",
      "__v": 0
    }
  ]
rewrite the 
/addtocart this code correctly 
app.post('/addtobill', async (req, res) => {
    try {
        const items = req.body; // Expecting an array of items
        const cartItems = [];

        // Validate input
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid input. Must provide an array of items.' });
        }

        for (const item of items) {
            const {
                productId,
                productName,
                productPrice,
                category,
                gst,
                reorderPoint,
                sku,
                quantity = 1,
                warehouse
            } = item;

            // Validate required fields for each item
            if (!productId || !productName || !productPrice || !category || !gst || !sku || !reorderPoint || !warehouse) {
                return res.status(400).json({ success: false, message: 'Missing required fields in item' });
            }

            // Find the product by SKU
            const product = await Product.findOne({ sku });
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found with SKU: ${sku}` });
            }

            // Check available stock for the specified warehouse
            const availableStock = product.stock[warehouse] || 0;

            // Ensure the requested quantity is less than or equal to the available stock
            if (quantity > availableStock) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${productName} in ${warehouse}` });
            }

            // Check if the cart item already exists
            let cartItem = await Cart.findOne({ sku, warehouse });

            if (cartItem) {
                // Check stock availability before updating the cart item
                if (availableStock >= cartItem.quantity + quantity) {
                    // Product exists in the cart, update its quantity
                    cartItem.quantity += quantity; // Update with new quantity
                    await cartItem.save();
                } else {
                    return res.status(400).json({ success: false, message: `Insufficient stock for ${productName} in ${warehouse}` });
                }
            } else {
                // Create a new cart entry
                cartItem = new Cart({
                    productId: product._id,
                    productName,
                    productPrice,
                    category,
                    gst,
                    quantity,
                    reorderPoint,
                    sku,
                    warehouse
                });
                await cartItem.save();
            }

            // Store cart item for response
            cartItems.push(cartItem);
        }

        res.json({ success: true, message: 'Products added to bill successfully', cart: cartItems });

    } catch (error) {
        console.error('Error adding products to bill:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add products to bill' });
    }
});

the the  cartModel is  

const mongoose = require('mongoose');

const CartModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity to 1 if not specified
    },
    sku: {
        type: String,
        required: true
    },
    reorderPoint: {
        type: String,
        required: true
    },
    warehouse: {
        type: String, // New field for the selected warehouse
        required: true
    }
});

const Cart = mongoose.model('billcart', CartModel);

module.exports = Cart;


