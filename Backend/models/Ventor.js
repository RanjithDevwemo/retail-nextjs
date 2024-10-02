const mongoose=require('mongoose');

//Ventor schema

const VentorSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true,unique:true}
});

const Ventors=mongoose.model('ventor',VentorSchema);

module.exports=Ventors;