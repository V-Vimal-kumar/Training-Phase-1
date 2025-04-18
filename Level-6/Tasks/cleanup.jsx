import { useEffect, useState } from "react";
import React from 'react'

function CleanUp() {

  const[run,setRun]=useState(true)

  useEffect(()=>{
    if(!run) return;

    const inter = setInterval(() => {
             console.log("Tik Tik...");
           }, 1000);
     
    return ()=>{
      clearInterval(inter);
      console.log("stopped")
    }
  },[run])
  return (
    <div>cleanup
      <button onClick={() => setRun(prev => !prev)}>{!run ? "start" : "Stop"}</button>
    </div>
  )
}

export default CleanUp