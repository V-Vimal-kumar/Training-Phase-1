import React from "react";
import { useState } from "react";

function Count(){
const [count,setCount]=useState(0);
return(
    <>
    <h1>counter:{count}</h1>
    <button onClick={()=>setCount(count+1)}>Add</button>
    <button onClick={()=>setCount(count-1)}>Minus</button>
    </>
)
}
export default Count