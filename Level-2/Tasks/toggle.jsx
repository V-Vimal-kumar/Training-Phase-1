import { useState } from "react";

function Toggle(){
    const [vis,setvis]=useState(false);
    return(
        <>
        <button onClick={()=>setvis(!vis)}>
            {vis ? "hide" : "show"}
        </button>
        {vis && <h2>helloo broo 🫣</h2>}
        </>
    )
}
export  default  Toggle