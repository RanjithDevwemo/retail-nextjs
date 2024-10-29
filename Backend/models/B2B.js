const mongoose=require('mongoose');

const B2BSchema=mongoose.Schema({
    copanyName:{
        type:String,
        required:true
    },
    dealstatus: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Cancelled', 'WIP'], 
        default: 'Pending' 
    },
    dealOwner:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const B2B=mongoose.model('B2B',B2BSchema);

module.exports=B2B;