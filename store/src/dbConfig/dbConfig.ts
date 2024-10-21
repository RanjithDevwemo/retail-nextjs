



// import mongoose from "mongoose";

// let isConnected = false; 

// export async function connect(tenantId: string) {
//     console.log("tenantId is ",tenantId);
    
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
     
//     }
// }






import mongoose from "mongoose";

let isConnected = false; 

export async function connect(tenantId: string) {
    console.log("tenantId is ",tenantId);
    
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
     
    }
}
