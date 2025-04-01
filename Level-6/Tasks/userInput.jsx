import { useState } from "react";
import React from 'react'

function UserInput() {

const [text,setText]=useState("");
const [age,setage]=useState("");


  return (
    <div>
        <input onChange={(e)=>setText(e.target.value)} value={text} placeholder="Enter your name.."/>
        <p>Name:{text}</p>
        <input onChange={(e)=>setage(e.target.value)} type="number" value={age} placeholder="Enter your age.."/>
        <p>Age:{age}</p>

    </div>
  )
}

export default UserInput