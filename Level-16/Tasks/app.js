import express from 'express';

const app=express();
const PORT=process.env.PORT || 3000;

app.get('/',(requst,response)=>{
    response.status(201).send("hello world")
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})