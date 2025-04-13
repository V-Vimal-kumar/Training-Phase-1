import { useState } from "react";

function Input(){
const [text,setText]=useState("");
return(
 <>
 <input onChange={(e)=>setText(e.target.value)}value={text} placeholder="type.."/>
 <p>{text}</p>
 </>
)
}
export default Input