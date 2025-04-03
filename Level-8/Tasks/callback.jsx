// import React, { useEffect,useState } from "react";

// export default function Call(){
//     const[name,setName]=useState("")

//     useEffect(()=>{
//         setTimeout(()=>{
//             setName("Vimal")
//         },2000)
//     },[])

//     useEffect(()=>{
//         console.log(name ? name:"fetching...")
//     })

//     return(
//         <>
//         <h1>Name:{name ? name:"fetching..."}</h1>
//         </>
//     )
// }
 
// call.jsx
// call.jsx
// call.jsx
import React, { useEffect, useState } from "react";

export default function Call() {
    const [name, setName] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        console.log("fetching...");
        setTimeout(() => {
            setName("Vimal");
            setIsFetching(false);
            console.clear(); // Clears previous logs
            console.log("Received Name: Vimal");
        }, 2000);
    }, []);

    return (
        <>
            <h1>Name: {isFetching ? "fetching..." : name}</h1>
        </>
    );
}
