import express from 'express';

const arr=express();

const students=([
    {id:1,email:"vk@gmail.com",name:"vk"},
    {id:2,email:"sk@gmail.com",name:"sk"},
    {id:3,email:"ak@gmail.com",name:"ak"}
])

const PORT=process.env.PORT || 3000;

arr.get('/api/users',(req,res)=>{
    res.send(students)
})

arr.get('/api/users/:id',(req,res)=>{
    console.log(req.params)
    const parseID=parseInt(req.params.id)
    console.log(parseID)
    if(isNaN(parseID))
        return res.status(400).send({msg:"bad request"});


const findUser=students.find((user)=>user.id === parseID)
if(!findUser)
    return res.sendStatus(404);
    res.send(findUser);
})



 arr.listen(PORT,()=>{
     console.log(`port is running on ${PORT}`)
 })

// import express from 'express'

// const arr=express();

// const students=([
//     {id:1,email:"vk@gmail.com",name:"vk"},
//     {id:2,email:"sk@gmail.com",name:"sk"},
//     {id:3,email:"ak@gmail.com",name:"ak"}
// ])

// const PORT=process.env.PORT || 3000;

// arr.post('/api/users',(req,res)=>{
//     const {body}=req;
//     const newStudent={id:students[students.length-1].id+1 ,...body}
//     students.push(newStudent)
//     return res.status(201).send(newStudent)
// })

// arr.listen(PORT,()=>{
//     console.log(`port is runniing on ${PORT}`)
// })