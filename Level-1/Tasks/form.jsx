import { useState } from "react";

function Form(){
    const[name,setName]=useState({fname:"",lname:""})

    return(
        <div>
            {name.fname}-{name.lname}
            <form>
            <input onChange={(e)=>setName({...name,fname:e.target.value})}
            value={name.fname}/>
             <input onChange={(e)=>setName({...name,lname:e.target.value})}
            value={name.lname}/>
            <button>submit</button>
            </form>
        </div>
    )   
}
export default Form