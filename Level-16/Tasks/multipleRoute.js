import express, { request, response } from "express";

const multipleRoute=express()

const PORT=process.env.PORT || 3000;

multipleRoute.get('/about',(request,response)=>{
    response.send('About us')
})

multipleRoute.get('/contact',(request,response)=>{
    response.send('Text me')
})

multipleRoute.get('/services',(request,response)=>{
    response.send('Fan service')
})

multipleRoute.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });


