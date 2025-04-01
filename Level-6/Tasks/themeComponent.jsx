import React,{ createContext, useState } from "react";
import ThemeContext from './themeContext';

export const ReactContext=createContext();

function ThemeComponent(){

    const[col,setCol]=useState("yellow")

    return(
        <ReactContext.Provider value={col}>
        <div>
            <p>Current color:{col}</p>
            <button onClick={()=>setCol(prompt('Enter a color:'))}>change</button>
            <ThemeContext/>
        </div>
        </ReactContext.Provider>
    );
}

export default ThemeComponent