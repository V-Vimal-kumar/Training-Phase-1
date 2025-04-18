import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app=express();
const port=process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
.then(()=>console.log('connecion success!'))
.catch((err)=>console.error('connecion declined',err))

app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.send("mongodb connected")
    }
    else{
        res.status(404).send("connection failed")
        }
})

app.listen(port,()=>{
    console.log("server is running")
})