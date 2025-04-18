import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes.js'; 


dotenv.config();

const app=express();
const port=process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json())
app.use('/api/posts', postRoutes);

mongoose.connect(mongoURI)
.then(()=>console.log('connecion success!'))
.catch((err)=>console.error('connecion declined',err))
  
app.listen(port,()=>{
    console.log("server is running")
})