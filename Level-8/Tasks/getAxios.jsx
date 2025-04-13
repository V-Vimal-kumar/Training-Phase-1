import {useState,useEffect} from "react";
import axios from "axios";

const url='https://jsonplaceholder.typicode.com/posts'

export default function DataFetcher(){
    const [fetch,setfetch]=useState([])
    const [load,setLoad]=useState(true)

    const resp=async()=>{
        try{
            const response=await axios(url)
            setfetch(response.data)
            setLoad(false)
            console.log(response.data)
        }
        catch(error){
            console.error(resp.error)
        }
    };
     
    useEffect(()=>{
        console.log("loading...")
        resp();
        },[])



    return(
        <>
        {load?(
        <p>loading...</p>
        ) : (
            <ul>
                {fetch.slice(0,5).map((item)=>(
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        )
    }
        </>
    )
}