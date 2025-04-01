import { useReducer } from "react";

 function UseRed(){

    function reducer(state,action){
        switch(action.type){
            case"increment":{
                return{count:state.count+1}
            }
            case"decrement":{
                return{count:state.count-1}
            }
            case"double":{
                return{count:state.count*2}
            }
        }
    }

    const[state,dispatch]=useReducer(reducer,{count:0})
    return(
        <div>
            <h1>count:{state.count}</h1>
            <button onClick={()=>dispatch({type:"increment"})}>+</button>
            <button onClick={()=>dispatch({type:"decrement"})}>-</button>
            <button onClick={()=>dispatch({type:"double"})}>*</button>
        </div>

    )
 }

 export default UseRed