
// // // import mongoose from "mongoose";


// // // export  async function Connect(tenantId){
// // //   const  MONGO_URI=`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`
// // //     try{
// // //         mongoose.connect(MONGO_URI!);
// // //         const connection=mongoose.connection;
// // // connection.on('connected',()=>{
// // //     console.log("MongoDB connected Successfully");
    
// // // })
// // // connection.on('error',(err)=>{
// // //     console.log('mongoDb connection error. Please make sure MongoDB is running .'+err);
// // //     process.exit();
    
// // // })
// // //     }catch(error){
// // //         console.log('Something goes wrong !');
// // //         console.log(error);
// // //     }
// // // }


// // // // import mongoose from "mongoose";

// // // // const MONGO_URI = 'mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/new';

// // // // export async function connect() {
// // // //     try {
// // // //         await mongoose.connect(MONGO_URI);

// // // //         console.log("MongoDB connected Successfully");
// // // //     } catch (error) {
// // // //         console.log('Something went wrong during MongoDB connection!');
// // // //         console.error(error);
// // // //         process.exit(1);
// // // //     }
// // // // }



// // // dbConfig.ts
// // import mongoose from 'mongoose';

// // export async function Connect(tenantId: string) {
// //     const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

// //     try {
// //         await mongoose.connect(MONGO_URI);
// //         console.log(`MongoDB connected successfully to database: ${tenantId}`);
// //     } catch (error) {
// //         console.error('MongoDB connection error:', error);
// //         process.exit(1);
// //     }
// // }




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
