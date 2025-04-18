import { useState,useEffect } from "react";

function Prom(){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        const name="vimal"
        resolve(name)
    },2000);
})
}

export default function UsePromise(){
const [name,setName]=useState("")
const [fetch,setFetch]=useState(true)

useEffect(()=>{
    console.log("fetching...")
    Prom().then((data)=>{
        setName(data)
        setFetch(false);
        console.clear()
        console.log("Name:",data)
    })
    .catch((error)=>{
        console.error("oops!",error)
    })

},[])

}


