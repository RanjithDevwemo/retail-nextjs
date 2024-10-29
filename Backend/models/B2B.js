// const mongoose=require('mongoose');

// const B2BSchema=mongoose.Schema({
//     companyName:{
//         type:String,
//         required:true
//     },
//     dealstatus: { 
//         type: String, 
//         enum: ['Pending', 'Completed', 'Cancelled', 'WIP'], 
//         default: 'Pending' 
//     },
//     dealOwner:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// })

// const B2B=mongoose.model('B2B',B2BSchema);

// module.exports=B2B;



const mongoose = require('mongoose');

// B2B Schema Definition
const B2BSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    dealStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled', 'WIP'],
        default: 'Pending',
    },
    dealOwner: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// B2B Model
const B2B = mongoose.model('B2B', B2BSchema);

// Export the B2B model
module.exports = B2B;
