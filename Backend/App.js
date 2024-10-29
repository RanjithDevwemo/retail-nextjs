
const express = require('express');
const BOM=require('./models/BillOfMatrial');
const Store=require('./models/store')
const Scraps=require('./models/Scraps');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('./models/ProductModel');
const Admin = require('./models/AdminModel');
const Order = require('./models/OrderModel');
const Cart=require("./models/Cart");
const Ventor=require('./models/Ventor');
const Purchase=require("./models/PurchaseOrder");
const WareHouse=require("./models/GoodsTransfer");
const ManufacturingCart=require('./models/ManuFacturingAddtoCart');
const ManufacturingProducts=require('./models/ManufacturingAddProduct');
const Worker=require('./models/Worker');
const B2B=require('./models/B2B');
// Create Express app
// const Store=require('./models/StoreModel');
const ManufacturingOrder=require('./models/ManuFacturingOrder')
const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'retail_jwt_secret';
const JWT_STORE='retail_store_jwt';
const connectDB=require('./Config/db');
// Middleware

//Routes
// const StoreRoute=require('./routes/StoreRoute');

// const {adminRouter}=require('./routes/adminRoutes')

const productRoutes=require('./routes/productRoutes');
// const orderRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());

connectDB();


// Image Storage Setup with Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload/images'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Serving uploaded images statically
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Image Upload Endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


// app.use('/store',StoreRoute);
// app.use('/admin', adminRouter);
// app.use('/api', productRoutes);
// app.use('/api', orderRoutes);



// app.post('/api/addproduct', async (req, res) => {
//     // console.log(req.body); 

//     try {
//         const { 
//             name, 
//             image, 
//             category, 
//             price, 
//             sku, 
//             gst, 
//             description, 
//             stocks, // Object with godown as keys
//             ventorId, 
//             reorderPoints // Object with godown as keys
//         } = req.body;

//         // Basic validation
//         if (!name || !image || !category || !price || !sku || !gst || !description || !ventorId || !stocks || !reorderPoints) {
//             return res.status(400).json({ success: false, message: 'Missing required fields' });
//         }

//         // Normalize category
//         const normalizedCategory = category.toLowerCase();

//         // Calculate final price
//         const finalPrice = Number(price) + (Number(price) * Number(gst) / 100);

//         // Check if SKU already exists
//         const existingProduct = await Product.findOne({ sku });
//         if (existingProduct) {
//             return res.status(400).json({ success: false, message: 'Product with this SKU already exists' });
//         }

//         // Check stock availability in each godown
//         for (const [godownKey, stockValue] of Object.entries(stocks)) {
//             if (stockValue <= 0) {
//                 return res.status(400).json({ success: false, message: `Out of stock in ${godownKey}` });
//             }
//         }

//         // Create and save new product
//         const product = new Product({
//             name,
//             image,
//             category: normalizedCategory,
//             price,
//             sku,
//             gst,
//             description,
//             stock: stocks, // Object of stocks by godown
//             ventorId,
//             reorderPoints, // Object of reorder points by godown
//             finalPrice
//         });

//         await product.save();
//         return res.json({ success: true, message: 'Product added successfully', product });
//     } catch (error) {
//         console.error('Error adding product:', error.message);
//         return res.status(500).json({ success: false, message: 'Failed to add product' });
//     }
// });




app.post('/api/addproduct', async (req, res) => {
    try {
        const { 
            name, 
            image, 
            category, 
            price, 
            sku, 
            gst, 
            description, 
            stocks, 
            ventorId, 
            reorderPoints 
        } = req.body;

        // Basic validation
        if (!name || !image || !category || !price || !sku || !gst || !description || !ventorId || !stocks || !reorderPoints) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Normalize category
        const normalizedCategory = category.toLowerCase();

        // Calculate final price
        const finalPrice = Number(price) + (Number(price) * Number(gst) / 100);

        // Check if SKU already exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: 'Product with this SKU already exists' });
        }

        // Check stock availability in each godown
        for (const [godownKey, stockValue] of Object.entries(stocks)) {
            if (stockValue <= 0) {
                return res.status(400).json({ success: false, message: `Out of stock in ${godownKey}` });
            }
        }

        // Create and save new product
        const product = new Product({
            name,
            image,
            category: normalizedCategory,
            price,
            sku,
            gst,
            description,
            stock: stocks, // Object of stocks by godown
            ventorId,
            reorderPoints, // Object of reorder points by godown
            finalPrice
        });

        // Calculate total stock value
        product.calculateTotalStockValue();

        await product.save();
        return res.json({ success: true, message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to add product' });
    }
});




//Admin Product get values in Product Id
app.get('/getproduct/:id',async (req,res)=>{
    try{
    let productId=req.params.id;
    let singleProduct= await Product.findById(productId);
    res.json(singleProduct);
    }catch(error){
        res.json({success:false,message:'cannot get the single product : '+error});
        console.log("cannot get single product : "+error);
        
    }

})
 



// User Signup Endpoint
app.post('/store/signup/demo', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingStore = await Store.findOne({ email });
        if (existingStore) {
            return res.status(400).json({ success: false, error: 'store with this email already exists' });
        }

        // Create and save new store
        const store = new Store({ name, email, password });
        await store.save();

        // Generate JWT token
        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up store:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sign up store' });
    }
});

// User Login Endpoint
app.post('/store/login/demo', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        // Find store by email
        const store = await Store.findOne({ email });
        if (!store) {
            return res.status(404).json({ success: false, error: 'store not found' });
        }

        // Compare password
        const isMatch = await store.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, error: 'Failed to log in' });
    }
});


// Middleware to fetch admin from token
const fetchStoredemo = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_STORE);
        req.store = decoded.store; // Assign the admin object from the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Store Token Verification Endpoint
app.get('/store/verify-token1', fetchStoredemo, (req, res) => {
    res.json({ success: true, user: req.store });
});





// Middleware to fetch admin from token
const fetchStore = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_STORE);
        req.store = decoded.store; // Assign the admin object from the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Store Token Verification Endpoint
app.get('/store/verify-token', fetchStore, (req, res) => {
    res.json({ success: true, user: req.store });
});


app.post('/order', async (req, res) => {
    try {
        const {
            items,
            totalValue,
            totalQuantity,
            customerName,
            customerPhoneNumber,
            paymentType,
            upiId,
            cardNo,
        } = req.body;

        // Basic validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Items are required and must be a non-empty array' });
        }
        if (totalValue === undefined || totalQuantity === undefined) {
            return res.status(400).json({ success: false, message: 'Total value and total quantity are required' });
        }
        if (!customerName || !customerPhoneNumber) {
            return res.status(400).json({ success: false, message: 'Customer name and phone number are required' });
        }

        const updatedItems = [];
        const purchasePromises = [];

        // Process each item in the order
        for (const item of items) {
            const { productId, quantity, warehouse } = item;

            // Find the product by ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
            }

            // Check stock in the specified warehouse
            const warehouseStock = product.stock[warehouse] || 0;
            if (quantity > warehouseStock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product with ID ${productId} in warehouse ${warehouse}. Available: ${warehouseStock}, Requested: ${quantity}`
                });
            }

            // Update product stock
            const updatedStock = { ...product.stock }; // Create a copy of the stock object
            updatedStock[warehouse] -= quantity; // Update the specific warehouse stock
            product.stock = updatedStock; // Assign the updated stock back to the product
            await product.save(); // Save the product to the database

            // Check stock level after update
            const reorderPoint = product.reorderPoints[warehouse] || 0;
            if (updatedStock[warehouse] < reorderPoint) {
                purchasePromises.push(handleLowStock(product));
            }

            // Add product details to the updated items array
            updatedItems.push({
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                quantity,
                reorderPoint // Ensure reorderPoint is included
            });
        }

        // Execute all purchase updates in parallel
        await Promise.all(purchasePromises);

        // Create and save new order
        const order = new Order({
            items: updatedItems,
            totalValue,
            totalQuantity,
            customerName,
            customerPhoneNumber,
            paymentType,
            upiId: paymentType === 'upiId' ? upiId : undefined,
            cardNo: paymentType === 'cardNo' ? cardNo : undefined,
        });

        await order.save();

        // Clear the cart after order creation
        await Cart.deleteMany({});

        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});

async function handleLowStock(product) {
    const vendorId = product.ventorId; // Ensure this matches your Product schema
    const foundVendor = await Vendor.findOne({ id: vendorId });

    if (foundVendor) {
        const message = `${product.name} stock is low (current stock: ${product.stock}). Vendor Name: ${foundVendor.name}, Vendor ID: ${vendorId}`;
        
        const purchase = new Purchase({
            productId: product._id,
            productName: product.name,
            vendorId,
            vendorName: foundVendor.name,
            message: message,
        });

        await purchase.save();
    } else {
        console.log(`Vendor with ID ${vendorId} not found.`);
    }
}

app.get('/latest-order', async (req, res) => {
    try {
        // Fetch the latest order sorted by createdAt in descending order
        const latestOrder = await Order.findOne().sort({ createdAt: -1 }).populate('items.productId');

        if (!latestOrder) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.json({ success: true, order: latestOrder });
    } catch (error) {
        console.error('Error fetching latest order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch latest order' });
    }
});




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
                name: productName,
                price: productPrice,
                category,
                gst,
                sku,
                quantity = 1, // Default quantity to 1 if not specified
                warehouse
            } = item;

            // Validate required fields for each item
            if (!productId || !productName || !productPrice || !category || !gst || !sku || !warehouse) {
                return res.status(400).json({ success: false, message: 'Missing required fields in item' });
            }

            // Find the product by SKU
            const product = await Product.findOne({ sku });
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found with SKU: ${sku}` });
            }

            // Check available stock for the specified warehouse
            const availableStock = Number(product.stock[warehouse]) || 0; 

            
            if (quantity > availableStock) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${productName} in ${warehouse}` });
            }

      
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
                    sku,
                    reorderPoint: product.reorderPoints[warehouse] || 0, // Fetch reorder point based on warehouse
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


app.post('/goods/transfer', async (req, res) => {
    try {
        const {
            orderNo, date, reason, sourceWarehouse, destinationWarehouse, 
            itemDetail, currentAvailability, destinationAvailability, transferQuantity
        } = req.body;

        // Validate required fields
        if (!orderNo || !date || !reason || !sourceWarehouse || !destinationWarehouse ||
            !itemDetail || transferQuantity === undefined || 
            currentAvailability === undefined || destinationAvailability === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

//find samename products in all godowns
        const firstProduct= await Product.findOne({ name: itemDetail,godown:sourceWarehouse });

console.log("firstProduct : ",firstProduct);

const secondProduct= await Product.findOne({ name: itemDetail,godown:destinationWarehouse });

console.log(secondProduct);


        // Find the product in the source warehouse
        const productInSource = await Product.findOne({ name: itemDetail, godown: sourceWarehouse });
        if (!productInSource) {
            return res.status(404).json({ success: false, message: `Product ${itemDetail} not found in source warehouse ${sourceWarehouse}` });
        }

        // Check if the transfer quantity is available in the source warehouse
        if (Number(transferQuantity) > productInSource.stock) {
            return res.status(400).json({ success: false, message: `Insufficient stock in source warehouse ${sourceWarehouse}` });
        }

        // Update stock in the source warehouse
        productInSource.stock -= Number(transferQuantity);
        await productInSource.save();

        // Find or create product in the destination warehouse
        let productInDestination = await Product.findOne({ name: itemDetail, godown: destinationWarehouse });
        if (productInDestination) {
            // Update existing product stock in destination warehouse
            productInDestination.stock += Number(transferQuantity);
            await productInDestination.save();
        } else{
            res.json({success:false,message:"the productInDestination is not Found Please Enter correct Destination value"})
        }

        // Create a new Warehouse entry to record the transfer
        const wareHouse = new WareHouse({
            orderNo,
            date,
            reason,
            sourceWarehouse,
            destinationWarehouse,
            itemDetail,
            currentAvailability,
            destinationAvailability,
            transferQuantity
        });
        await wareHouse.save();

        // Respond with success message
        res.json({ success: true, message: 'Product transferred successfully' });
    } catch (error) {
        console.error('Error transferring goods:', error.message);
        res.status(500).json({ success: false, message: 'Failed to transfer goods' });
    }
});

app.post('/addventor',async (req,res)=>{
    try{
const {id,name,address,phone,email}=req.body;
// console.log(id,name,address,phone,email);

if(!id||!name||!address||!phone||!email){
    return res.json({success:false,message:"Missing Required fields"});
}
const ventorId=await Ventor.findOne({id:id});
const ventoEmail=await Ventor.findOne({email});
if(ventorId){
    return res.json({success:false,message:'ventor Id is Already exists'});
}else if(ventoEmail){
    return res.json({success:false,message:'ventor Email is Already exists'});
}
const ventor=new Ventor({id,name,address,phone,email});

await ventor.save();

res.json({success:true,ventor})
    }catch(error){
res.json({success:false,message:"ventor detail server error ",error});
    }
})



// ////          newly added one

// app.post('/addventor', async (req, res) => {
//     try {
//         const { id, name, address, phone, email, products } = req.body;

//         // Check for missing required fields
//         if (!id || !name || !address || !phone || !email) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         // Check if the vendor ID or email already exists
//         const existingVendorId = await Ventor.findOne({ id });
//         const existingVendorEmail = await Ventor.findOne({ email });

//         if (existingVendorId) {
//             return res.status(409).json({ success: false, message: 'Vendor ID already exists' });
//         } else if (existingVendorEmail) {
//             return res.status(409).json({ success: false, message: 'Vendor email already exists' });
//         }

//         // Validate products if provided
//         const productsArray = Array.isArray(products) ? products : [];
//         productsArray.forEach(product => {
//             if (!product.productId || !product.productName || product.price == null || product.quantity == null) {
//                 return res.status(400).json({ success: false, message: "Invalid product data" });
//             }
//         });

//         // Create and save the new vendor
//         const vendor = new Ventor({ id, name, address, phone, email, products: productsArray });
//         await vendor.save();

//         res.status(201).json({ success: true, vendor });
//     } catch (error) {
//         console.error("Error adding vendor:", error); // Log the error for debugging
//         res.status(500).json({ success: false, message: "Server error while adding vendor", error: error.message });
//     }
// });


app.get('/allventors',async (req,res)=>{
    try{
const allVentors=await Ventor.find({});

if(!allVentors){
    return res.json({success:false,message:'ventors not found 0 ventors'})
}
res.json({success:true,message:allVentors});
    }catch(error){
res.json({success:false,message:'server error ',error});
    }
})

// Fetch All Cart Items Endpoint
app.get('/getall/Cartproducts', async (req, res) => {
    try {
        const cartItems = await Cart.find({});
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch cart items' });
    }
});

app.get('/getOnchangeValue', async (req, res) => {
    try {
        // Extract query parameters
        const { name, sourceWarehouse, destinationWarehouse } = req.query;

        // Validate required parameters
        if (!name || !sourceWarehouse || !destinationWarehouse) {
            return res.status(400).json({ success: false, message: 'Missing required query parameters' });
        }

        // Fetch the product details from the source warehouse
        const productInSource = await Product.findOne({ name, godown: sourceWarehouse });
        if (!productInSource) {
            return res.status(404).json({ success: false, message: `Product '${name}' not found in source warehouse '${sourceWarehouse}'` });
        }

        // Fetch the product details from the destination warehouse
        const productInDestination = await Product.findOne({ name, godown: destinationWarehouse });
        
        res.json({
            success: true,
            sourceProduct: {
                stock: productInSource.stock,
                // You can include additional details if needed
            },
            destinationProduct: productInDestination ? {
                stock: productInDestination.stock,
                // You can include additional details if needed
            } : null
        });
    } catch (error) {
        console.error('Error in /getOnchangeValue:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// app.get('/todaySales', async (req, res) => {
//     try {
//         let today = new Date();
//         // Set the time to the beginning of the day
//         today.setHours(0, 0, 0, 0);
        
//         // Get today's sales by filtering orders
//         let totalOrders = await Order.find({});
//         let todaySales = totalOrders.filter(order => {
//             let orderDate = new Date(order.createdAt);
//             return orderDate >= today && orderDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
//         });

//         res.json({ success: true, message: todaySales });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching sales data', error });
//     }
// });


app.get('/todaySales', async (req, res) => {
    try {
        let today = new Date();
        // Set the time to the beginning of the day
        today.setHours(0, 0, 0, 0);
        
        // Get today's sales by filtering orders
        let totalOrders = await Order.find({});
        let todaySales = totalOrders.filter(order => {
            let orderDate = new Date(order.createdAt);
            return orderDate >= today && orderDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        });

        // Calculate total amount and total quantity
        let totalAmount = 0;
        let totalQuantity = 0;

        todaySales.forEach(order => {
            totalAmount += order.totalValue;
            totalQuantity += order.totalQuantity; 
        });

        res.json({
            success: true,
            message: todaySales,
            totalAmount: totalAmount,
            totalQuantity: totalQuantity
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sales data', error });
    }
});


app.get('/allproducts', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});

app.post('/api/scrap',async(req,res)=>{
    try{
        const {ItemName,ItemCategory,EstimateQuantity,ActualQuantity,Unit,CostAllocation}=req.body;
        if(!ItemName||!ItemCategory||!EstimateQuantity||!ActualQuantity||!Unit||!CostAllocation){
            return res.json({success:false,message:"Please Enter ItemName,ItemCategory,EstimateQuantity,ActualQuantity,CostAllocation values"});
        }
        //create the scraps document
        const scraps=new Scraps({ItemName,ItemCategory,EstimateQuantity,ActualQuantity,Unit,CostAllocation});
        //save in database
        await scraps.save();
        res.json({success:true,message:"Scraps values added success fully"});
    }catch(error){
        res.json({success:false,message:"server error : ",error});
    }
})

app.get('/api/scrap',async(req,res)=>{
    try{
        const AllScraps=await Scraps.find({});
        res.json({success:true,message:"success",data:AllScraps});
    }catch(error){
        console.log("server error : ",error);
        res.json({success:true,message:"Server Error : ",error});
    }
})

app.get('/allWarehouse', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        
        const warehouses = new Set();
        const products = [];

        allProducts.forEach(product => {
            // Collect unique warehouse names from stock and reorderPoints
            Object.keys(product.stock).forEach(warehouse => {
                warehouses.add(warehouse);
            });
            Object.keys(product.reorderPoints).forEach(warehouse => {
                warehouses.add(warehouse);
            });

            // Push the product details to the products array, including images
            products.push({
                id: product._id,
                name: product.name,
                category: product.category,
                price: product.price,
                sku: product.sku,
                gst: product.gst,
                description: product.description,
                stock: product.stock,
                ventorId: product.ventorId,
                finalPrice: product.finalPrice,
                totalStockValue: product.totalStockValue,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                news: product.news,
                image: product.image, // Add image field
            });
        });

        // Convert the Set to an array for unique warehouses
        const uniqueWarehouses = Array.from(warehouses);

        // Respond with both unique warehouses and product details
        res.status(200).json({ uniqueWarehouses, products });
    } catch (error) {
        console.error('Error fetching all warehouses and products:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch warehouses and products' });
    }
});



//Top five Low Stock Items

app.get('/topfive/lowstock/products', async (req, res) => {
    try {
        const allProducts = await Product.find({});

        // Organize products by warehouse
        const warehouseProducts = {};

        allProducts.forEach(product => {
            for (const warehouse in product.stock) {
                if (!warehouseProducts[warehouse]) {
                    warehouseProducts[warehouse] = [];
                }
                warehouseProducts[warehouse].push({
                    ...product.toObject(),
                    stock: product.stock[warehouse], // Keep stock for this warehouse
                });
            }
        });

        // Get top 5 low stock products for each warehouse
        const topLowStockProducts = {};
        for (const warehouse in warehouseProducts) {
            topLowStockProducts[warehouse] = warehouseProducts[warehouse]
                .sort((a, b) => a.stock - b.stock) // Sort by stock in ascending order
                .slice(0, 5); // Get the top 5
        }

        res.status(200).json({ success: true, products: topLowStockProducts });
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});


app.put('/allproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Please provide a Product ID.' });
        }

        const productUpdate = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        
        if (!productUpdate) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.json({ success: true, message: "Product updated successfully.", productUpdate });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});


app.get('/getsingleproduct/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.json({success:false,message:'Please Add Product Id '});
        }
        const findProduct=await Product.findById(id);
        if(!findProduct){
            return res.json({success:false,message:'Product not found '});
        }
        res.json({success:true,findProduct});
    }catch(error){
        res.json({success:false,message:'server error'});
    }
})

app.put('/updateCartItem/:id', async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity, warehouse } = req.body;

        console.log(`Warehouse: ${warehouse}`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Cart Item ID: ${cartItemId}`);

        // Validate request parameters and body
        if (!cartItemId || quantity === undefined || !warehouse) {
            return res.status(400).json({ success: false, message: 'Cart item ID, quantity, and warehouse are required' });
        }

        // Ensure quantity is a positive number
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
        }

        // Find the cart item
        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        // Find the product associated with the cart item
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Get the stock value for the specified warehouse
        const stockValue = product.stock[warehouse];

        // Check if the requested quantity is available in stock
        console.log("Stock available:", stockValue);
        if (stockValue === undefined) {
            return res.status(404).json({ success: false, message: `Warehouse "${warehouse}" not found` });
        }

        if (quantity > stockValue) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }

        // Update the cart item quantity and save it
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ success: true, message: 'Cart item updated successfully', cartItem, product });
    } catch (error) {
        console.error('Error updating cart item:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update cart item' });
    }
});



app.delete('/single/product/:id',async (req,res)=>{

    try{
    const id=req.params.id;
   
    const deleteSingleProduct=await Cart.findByIdAndDelete(id);

    if(!deleteSingleProduct){
        return res.json({success:false,message:"product Not found"})
    }
    res.json({success:true,message:'product deleted successfully : ',deleteSingleProduct});

    }catch(error){
        res.json({success:false,message:'server error',error})
    }

})

app.delete('/allproduct/delete/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const deleteOne=await Product.findByIdAndDelete(id);
        if(!deleteOne){
            return res.json({success:false,message:"Product Not Found"});
        }
        res.json({success:true,message:"product deleted in success fully"});
    }catch(error){
        res.json({success:false,message:'server error',error});
    }
})

app.get('/orders/byPhoneNumber', async (req, res) => {
    const { phoneNumber } = req.query;

    // Validate phoneNumber
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    try {
        // Find orders by phone number
        const orders = await Order.find({ customerPhoneNumber: phoneNumber }).populate({
            path: 'items.productId',
            select: 'name price'  // Fetch product name and price
        });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for the provided phone number' });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

app.get("/fetch/graph",async (req,res)=>{
    try{
      const date = new Date();
// Subtract 7 days
date.setDate(date.getDate() - 7);
const allOders=await Order.find({});

if(!allOders){
    return res.json({success:false,message:"Values not Found"});
}
res.json({success:true,message:allOders});
        
    }catch(error){
        res.json({success:false,message:"server error ",error})
    }
})


app.get("/today/topfive/products", async (req, res) => {
    try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Fetch all orders from the database
        const allOrders = await Order.find({});

        if (!allOrders || allOrders.length === 0) {
            return res.json({ success: false, message: "No orders found" });
        }

        const productSales = {};

        // Loop through each order
        for (const order of allOrders) {
            const orderDate = new Date(order.createdAt).toISOString().split('T')[0];

            // Check if the order date is today
            if (orderDate === today) {
                for (const item of order.items) {
                    const productId = item.productId;

                    // Fetch product details by ID
                    const product = await Product.findById(productId); // Assuming you have a Product model

                    if (product) {
                        const productName = product.name; // Assuming your product has a 'name' field
                        const productImage = product.image; // Assuming your product has an 'image' field
                        const quantity = item.quantity;

                        // Initialize product sales if not present
                        if (!productSales[productId]) {
                            productSales[productId] = {
                                name: productName,
                                image: productImage,
                                quantity: 0
                            };
                        }

                        // Sum up the quantities
                        productSales[productId].quantity += quantity;
                    }
                }
            }
        }

        // Convert the productSales object into an array and sort by quantity
        const sortedProducts = Object.entries(productSales)
            .map(([id, { name, image, quantity }]) => ({ id, name, image, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5); // Get top 5 products

        res.json({ success: true, message: sortedProducts });
        
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});

app.get('/storename/:id',async (req,res)=>{
    try{
        const {id}=req.params;

        const store=await Store.findById(id);
        if(!store){
            return res.json({success:false,message:'Store not Found'});
        }
        res.json({success:true,store})
    }catch(error){
        res.json({success:false,message:'server error : ',error});
        
    }  
})


//Bill Of Matrial

app.post('/api/bom', async (req, res) => {
    try {
        const { name, quantity, unit, singleProduct } = req.body;

        // Check for required fields
        if (!name || !quantity || !unit || singleProduct === undefined) {
            return res.json({ success: false, message: "name, quantity, unit, and singleProduct are required" });
        }

        // Initialize convertedQuantity
        let convertedQuantity = quantity;

        // Convert quantity from milliliters to liters if unit is 'milliliter'
        if (unit === 'milliliter') {
            convertedQuantity = quantity / 1000; 
        }

        // Convert quantity from milligrams to kilograms if unit is 'milligram'
        if (unit === 'milligram') {
            convertedQuantity = quantity / 1000000; 
        }

        // Calculate total amount
        const totalAmount = singleProduct * convertedQuantity;

        // Create the BOM document
        const bom = new BOM({ name, quantity: convertedQuantity, unit, singleProduct, totalAmount });

        // Save to the database
        await bom.save();

        res.json({
            success: true,
            message: `Success: ${bom}`,
            totalAmount, 
        });
    } catch (error) {
        console.error('Error creating BOM:', error);
        res.json({ success: false, message: "Server error", error });
    }
});


app.get("/api/bom",async (req,res)=>{
    try{
const getBOM=await BOM.find({});
res.json({success:true,message:"fetching successfulle",data:getBOM});
    }catch(error){
        res.json({success:false,message:"sever error : ",error});
    }
})


// PATCH endpoint to update BOM status
app.patch("/api/bom/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedBOM = await BOM.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } 
        );

        if (!updatedBOM) {
            return res.status(404).json({
                success: false,
                message: "BOM item not found."
            });
        }

        res.json({
            success: true,
            message: "BOM status updated successfully.",
            data: updatedBOM
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating BOM status.",
            error
        });
    }
});


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

app.get('/api/manufacturingAdd',async (req,res)=>{
    try{
        let val=await ManufacturingProducts.find({});

        res.json({success:true,message:"fetching all products ",data:val});
    }catch(error){
        res.json({success:false,message:"server error : ",error});
    }
})

app.post("/api/cart", async (req, res) => {
    try {
        const items = req.body; 


        const addedItems = [];

        for (const item of items) {
            const { productId, ItemName, quantity, amount } = item;

            if (!productId || !ItemName || quantity <= 0 || !amount) {
                return res.json({ success: false, message: "Product ID, name, quantity (greater than 0), and amount are required" });
            }

            // Check if the item already exists in the cart
            let existingCartItem = await ManufacturingCart.findOne({ productId });

            if (existingCartItem) {
                // Update quantity if exists
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                addedItems.push(existingCartItem);
            } else {
                // Create new cart item
                const newCartItem = new ManufacturingCart({ productId, ItemName, quantity, amount });
                await newCartItem.save();
                addedItems.push(newCartItem);
            }
        }

        res.json({ success: true, message: "Items added to cart successfully", data: addedItems });
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});


// Endpoint to decrease quantity
app.put("/api/cart/decrease", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.json({ success: false, message: "Product ID and quantity are required" });
        }

        const cartItem = await ManufacturingCart.findOne({ productId });

        if (!cartItem) {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        // Decrease the quantity
        if (cartItem.quantity > quantity) {
            cartItem.quantity -= quantity;
            await cartItem.save();
            return res.json({ success: true, message: "Item quantity decreased", data: cartItem });
        } else if (cartItem.quantity === quantity) {
            // Remove the item if quantity is reduced to zero
            await ManufacturingCart.deleteOne({ productId });
            return res.json({ success: true, message: "Item removed from cart" });
        } else {
            return res.json({ success: false, message: "Cannot decrease more than available quantity" });
        }
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});


// POST /order endpoint
// app.post('/api/order', async (req, res) => {
//     const { username, phoneNumber, cartItems } = req.body;

//     // Basic validation
//     if (!username || !phoneNumber || !Array.isArray(cartItems) || cartItems.length === 0) {
//         return res.status(400).json({ success: false, message: 'Invalid input data.' });
//     }

//     try {
//         const orderItems = [];

//         for (const item of cartItems) {
//             const product = await ManufacturingProducts.findById(item.productId);
//             if (!product) {
//                 return res.status(400).json({ success: false, message: `Product not found for productId ${item.productId}.` });
//             }

//             // Check if there's enough stock
//             if (product.stock < item.quantity) {
//                 return res.status(400).json({ success: false, message: `Not enough stock for ${product.ItemName}.` });
//             }
//             product.oldstock+=product.stock;
//             // Reduce stock
//             product.stock -= item.quantity;
//             await product.save();

//             // Add to order items
//             orderItems.push({
//                 productId: product._id,
//                 ItemName: product.ItemName,
//                 quantity: item.quantity,
//                 amount: product.amount,
//             });
//         }

//         // Create the order object
//         const order = new ManufacturingOrder({
//             username,
//             phoneNumber,
//             cartItems: orderItems,
//             orderDate: new Date(),
//         });

//         // Save the order to the database
//         await order.save();

//         // Optionally, remove items from the cart after placing the order
//         await ManufacturingCart.deleteMany({ productId: { $in: cartItems.map(item => item.productId) } });

//         return res.status(200).json({ success: true, message: 'Order placed successfully!', order });
//     } catch (error) {
//         console.error('Error processing order:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// });

app.post('/api/order', async (req, res) => {
    const { username, phoneNumber, cartItems } = req.body;

    // Basic validation
    if (!username || !phoneNumber || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data.' });
    }

    try {
        const orderItems = [];

        for (const item of cartItems) {
            const product = await ManufacturingProducts.findById(item.productId);
            if (!product) {
                return res.status(400).json({ success: false, message: `Product not found for productId ${item.productId}.` });
            }

            // Check if there's enough stock
            if (product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Not enough stock for ${product.ItemName}.` });
            }

            // Update old stock to the current stock before deducting
            product.oldstock = product.stock;

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();

            // Add to order items
            orderItems.push({
                productId: product._id,
                ItemName: product.ItemName,
                quantity: item.quantity,
                amount: product.amount,
            });
        }

        // Create the order object
        const order = new ManufacturingOrder({
            username,
            phoneNumber,
            cartItems: orderItems,
            orderDate: new Date(),
        });

        // Save the order to the database
        await order.save();

        // Optionally, remove items from the cart after placing the order
        await ManufacturingCart.deleteMany({ productId: { $in: cartItems.map(item => item.productId) } });

        return res.status(200).json({ success: true, message: 'Order placed successfully!', order });
    } catch (error) {
        console.error('Error processing order:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});



app.get('/api/order',async (req,res)=>{
    try{
        const getOrders=await ManufacturingOrder.find({});
        res.json({success:true,message:getOrders})
    }catch(error){
        res.json({success:false,message:"server Error : ",error});
        console.log("server error ");   
    }
})

app.patch('/api/order/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await ManufacturingOrder.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
        console.log("Server error: ", error);
    }
});


app.get('/api/cart',async (req,res)=>{
    try{
const getCartValue=await ManufacturingCart.find({});
res.json({success:true,message:"successfulle getting",data:getCartValue});
    }catch(error){
res.json({success:false,message:"server error : ",error});
    }
})

app.get('/getname/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.json({ success: true, admin });
    } catch (error) {
        console.error('Error fetching admin:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch admin' });
    }
});


// Create a new worker
app.post('/api/worker', async (req, res) => {
    try {
        const { processNumber, jobWorkNumber, targetQuantity, completedQuantity } = req.body;

        // Validate input
        if (!processNumber || !jobWorkNumber || !targetQuantity || !completedQuantity) {
            return res.json({ success: false, message: "Missing required fields." });
        }

        // Create a new worker instance
        const worker = new Worker({
            processNumber,
            jobWorkNumber,
            targetQuantity,
            completedQuantity
        });

        // Save the worker to the database
        await worker.save();

        res.json({ success: true, message: worker });
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});

// Get all workers
app.get('/api/worker', async (req, res) => {
    try {
        const workers = await Worker.find({});
        res.json({ success: true, message: "Fetching success", data: workers });
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});

// Update an existing worker
app.put('/api/worker/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { processNumber, jobWorkNumber, targetQuantity, completedQuantity } = req.body;

        if (!processNumber || !jobWorkNumber || !targetQuantity || !completedQuantity) {
            return res.json({ success: false, message: "Missing required fields." });
        }

        const updatedWorker = await Worker.findByIdAndUpdate(
            id,
            { processNumber, jobWorkNumber, targetQuantity, completedQuantity },
            { new: true }
        );

        if (!updatedWorker) {
            return res.json({ success: false, message: "Worker not found." });
        }

        res.json({ success: true, message: updatedWorker });
    } catch (error) {
        res.json({ success: false, message: "Server error", error });
    }
});


// //B2B add values
// app.post('/api/b2badd',async (req,res)=>{
//     try{
//         const{companyName,dealstatus,dealOwner}=req.body;
//         if(!companyName||!dealstatus||!dealOwner){
//             return res.json({success:false,message:"missing required value ."});
//         }
//         const b2b=new B2B({companyName,dealstatus,dealOwner});
//         //save in database
//         await b2b.save();
//         res.json({success:true,message:"b2b values added successfully"});
//     }catch(error){
// res.json({success:false,message:"server error : ",error})
//     }
// })



// B2B Add Values API Endpoint
app.post('/api/b2badd', async (req, res) => {
    try {
        const { companyName, dealOwner } = req.body;

        // Validate required fields
        if (!companyName || !dealOwner) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields." 
            });
        }

        // Create a new B2B instance with a default dealStatus
        const b2b = new B2B({
            companyName,
            dealOwner,
            dealStatus: 'Pending' // Default status
        });

        // Save to database
        await b2b.save();

        // Respond with success
        return res.status(201).json({ 
            success: true, 
            message: "B2B values added successfully." 
        });
    } catch (error) {
        console.error("Server error:", error); // Log error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Server error occurred.", 
            error: error.message 
        });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






