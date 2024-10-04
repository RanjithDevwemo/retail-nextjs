
// import mongoose from "mongoose";


// export  async function Connect(){
//   const  MONGO_URI='mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/new1'
//     try{
//         mongoose.connect(MONGO_URI!);
//         const connection=mongoose.connection;
// connection.on('connected',()=>{
//     console.log("MongoDB connected Successfully");
    
// })
// connection.on('error',(err)=>{
//     console.log('mongoDb connection error. Please make sure MongoDB is running .'+err);
//     process.exit();
    
// })
//     }catch(error){
//         console.log('Something goes wrong !');
//         console.log(error);
//     }
// }






// dbConfig.ts
import mongoose from 'mongoose';

export async function Connect(tenantId: string) {
    const MONGO_URI = `mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`;

    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected successfully to database: ${tenantId}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
