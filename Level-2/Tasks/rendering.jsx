import React from "react";

function Render(){
   const items=["a","b","c"]

   return(
    <>
    <ul>
        {items.map((item,index)=>(
        <li key={index}>{item}</li>)) }
    </ul>
    </>
   )
}
export default Render

