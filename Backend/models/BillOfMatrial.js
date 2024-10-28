// const mongoose=require("mongoose");

// const BOM=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     unit:{
//         type:String,
//         required:true
//     }
// })

// const BillOfMatrial=mongoose.model('BOM',BOM);

// module.exports=BillOfMatrial;




const mongoose = require("mongoose");

const BOMSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    singleProduct: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
    },
});

const BillOfMaterial = mongoose.model('BOM', BOMSchema);

module.exports = BillOfMaterial;
