import React,{useContext,useState} from 'react';
import { ReactContext } from './themeComponent';

function ThemeContext() {
    const color=useContext(ReactContext)
    const[change,setChange]=useState()

    return(
        <div style={{backgroundColor:color,padding:"20px",color:"black"}}>
            <h1>Color:{color}</h1>
        </div>
    )
    
}

export default ThemeContext