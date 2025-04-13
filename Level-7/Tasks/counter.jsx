import React from "react";
import { useState } from "react";

function Counter(){
const [count,setCount]=useState(0);

const reset = () => {
    setCount(0);
  };

return(
    <>
    <h1>counter:{count}</h1>
    <button onClick={()=>setCount(count+1)}>Add</button>
    <button onClick={()=>setCount(count-1)}>Minus</button>
    <button onClick={reset}>Reset</button>
    </>
)
}
export default Counter