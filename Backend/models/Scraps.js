const mongoose=require('mongoose');

const ScrapsModel=new mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    ItemCategory:{
        type:String,
        required:true
    },
    EstimateQuantity:{
        type:Number,
        required:true
    },
    ActualQuantity:{
        type:Number,
        required:true
    },
    Unit:{
type:String,
required:true
    },
    CostAllocation:{
        type:Number,
        required:true
    }
});

const Scraps=mongoose.model('Scraps',ScrapsModel);

module.exports=Scraps;