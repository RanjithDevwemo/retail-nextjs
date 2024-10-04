
import mongoose from "mongoose";


export  async function Connect(){
  const  MONGO_URI='mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/new1'
    try{
        mongoose.connect(MONGO_URI!);
        const connection=mongoose.connection;
connection.on('connected',()=>{
    console.log("MongoDB connected Successfully");
    
})
connection.on('error',(err)=>{
    console.log('mongoDb connection error. Please make sure MongoDB is running .'+err);
    process.exit();
    
})
    }catch(error){
        console.log('Something goes wrong !');
        console.log(error);
    }
}


// import mongoose from "mongoose";

// const MONGO_URI = 'mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/new';

// export async function connect() {
//     try {
//         await mongoose.connect(MONGO_URI);

//         console.log("MongoDB connected Successfully");
//     } catch (error) {
//         console.log('Something went wrong during MongoDB connection!');
//         console.error(error);
//         process.exit(1);
//     }
// }


