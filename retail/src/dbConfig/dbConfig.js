// // dbConfig.ts
// import mongoose from 'mongoose';

// let isConnected: boolean = false; // Connection state

// export async function Connect(tenantId: string) {
//     const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

//     if (isConnected) {
//         console.log(`Already connected to database: ${tenantId}`);
//         return;
//     }

//     try {
//         await mongoose.connect(MONGO_URI);
//         isConnected = true;
//         console.log(`MongoDB connected successfully to database: ${tenantId}`);
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// }






// dbConfig.js
const mongoose = require('mongoose');

let isConnected = false; // Connection state

async function Connect(tenantId) {
    const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

    if (isConnected) {
        console.log(`Already connected to database: ${tenantId}`);
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log(`MongoDB connected successfully to database: ${tenantId}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports ={Connect};
