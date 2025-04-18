import { useState } from "react";
import axios from "axios";

const url='https://jsonplaceholder.typicode.com/posts'

export default function PostAxios(){
    const[name,setName]=useState("")
    const[regno,SetRegno]=useState()

    const handlesubmit=async(e)=>{
        e.preventDefault()
        try{
        const resp=await axios.post (url,{name,regno})
        console.log(resp)
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div>
            <form onSubmit={handlesubmit}>
                <label>name:</label>
                <input
                onChange={(e)=>setName(e.target.value)}/>

                <label>RegNo:</label>
                <input
                onChange={(e)=>SetRegno(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}
