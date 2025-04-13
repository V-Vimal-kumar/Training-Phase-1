// // call.jsx
// import React, { useEffect, useState } from "react";

// function fetchDataPromise() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const name = "Vimal";
//             resolve(name);
//         }, 2000);
//     });
// }

// async function fetchDataAsync() {
//     try {
//         console.log("fetching...");
//         const data = await fetchDataPromise();
//         console.clear(); 
//         console.log("Received Name:", data);
//         return data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// export default function Call() {
//     const [name, setName] = useState("");
//     const [isFetching, setIsFetching] = useState(true);

//     useEffect(() => {
//         fetchDataAsync().then((data) => {
//             if (data) {
//                 setName(data);
//                 setIsFetching(false);
//             }
//         });
//     }, []);

//     return (
//         <>
//             <h1>Name: {isFetching ? "fetching..." : name}</h1>
//         </>
//     );
// }
import { useEffect,useState } from "react";

function FetchProm(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        const name="vimal";
        resolve(name);
    },2000)
})
}

async function AsyncFunc(){
    console.log('fetching')
    const data=await FetchProm();
    console.log(data)
    return data
}

export default function UseAsync(){
    const[name,setName]=useState("")
    const[fetch,setFetch]=useState(true)

    useEffect(()=>{
        AsyncFunc().then((data)=>{
            if(data){
                setName(data)
                setFetch(false)
            }
        })
    },[])
}