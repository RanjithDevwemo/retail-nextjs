// // const mongoose = require("mongoose");

// // const connectDB = async (tenantId) => {
// //     try {
// //         await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`);
// //         console.log(`Connected to MongoDB tenent Id is ${tenantId}`);
// //     } catch (error) {
// //         console.error("Connection to MongoDB failed:", error.message);
// //     }
// // };

// // module.exports = connectDB;


// const mongoose = require("mongoose");

// // Function to connect to MongoDB using tenant ID
// const connectDB = async (tenantId) => {
//     try {
//         await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`Connected to MongoDB. Tenant ID is ${tenantId}`);
//     } catch (error) {
//         console.error("Connection to MongoDB failed:", error.message);
//         throw error; // Propagate the error for further handling
//     }
// };

// module.exports = connectDB;





const mongoose = require("mongoose");

// Function to connect to MongoDB using tenant ID
const connectDB = async (tenantId) => {
    try {
        await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`);
        console.log(`Connected to MongoDB. Tenant ID is ${tenantId}`);
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
        throw error; // Propagate the error for handling in the endpoint
    }
};

module.exports = connectDB;











// const express = require('express');
// const connectDB = require('./Config/db');
// const cors=require('cors');
// const app = express();

// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(cors());
// // Endpoint to handle passing the tenant ID
// app.post('/passTenantId', async (req, res) => {
//     const { tenantId } = req.body;
// console.log(tenantId);

//     // Validate tenant ID
//     if (!tenantId) {
//         return res.status(400).json({ error: 'Tenant ID is required' });
//     }

//     try {
//         await connectDB(tenantId); 
//         return res.status(200).json({ message: 'Tenant ID processed successfully' });
//     } catch (error) {
//         console.error('Error processing tenant ID:', error.message);
//         return res.status(500).json({ error: 'Failed to process tenant ID' });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
