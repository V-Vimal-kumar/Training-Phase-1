import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    address:String,
    group:String},
    {timestamps:true});

    export default mongoose.model('Contact',contactSchema);