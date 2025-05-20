import express from 'express';

const arr=express();

const PORT=process.env.PORT || 3000;

arr.get('/api/users',(req,res)=>{
    res.send([
        {id:1,email:"vk@gmail.com",name:"vk"},
        {id:2,email:"sk@gmail.com",name:"sk"},
        {id:3,email:"ak@gmail.com",name:"ak"}
    ])
})

 arr.listen(PORT,()=>{
     console.log(`port is running on ${PORT}`)
 })