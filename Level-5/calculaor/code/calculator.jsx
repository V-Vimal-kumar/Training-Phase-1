// import React, { useState } from 'react'

// function Calculator() {

// const [num,setNum]=useState(null)
// const[operation,setOperation]=useState(null)
// const [previousValue,setPreviousValue]=useState(null)
// // const[allNum,setAllNum]=useState('')

// function handleNumClick(inp){
//   setNum((prev)=>prev+inp);
// };

// function handleOperation(op){
//   if(num==="") return;
//   setPreviousValue(num);
//   setOperation(op);
//   setNum('');
//   // setAllNum((prev)=>prev+""+op+"");
// };

// function equalOpration(operation){
//   if(!previousValue || !num  || !operation) return;

//   const num1= parseFloat(previousValue);
//   const num2=parseFloat(num);
//   let result=0;

//   switch(operation){
//     case "+":
//       result=num1+num2;
//       break;

//     case "-":
//       result=num1-num2;
//       break;

//     case "*":
//       result=num1*num2;
//       break;

//     case '/':
//       result=num2 !== 0 ? num1/num2 : 'error';
//   }

// }

// function Div(){

// }

// function Equal(){

// }

//   return (
//     <div>
//         <input
//         placeholder='enter the num...'
//         onChange={(e)=>setNum(e.target.value)}/>
//         <button onClick={Equal}>=</button>
//         <div>
//         <button onClick={Add}>+</button>
//         <button onClick={Sub}>-</button>
//         <button onClick={Mul}>*</button>
//         <button onClick={Div}>/</button>
//         </div>
//     </div>
//   )
// }

// export default Calculator;

import { useState } from "react";
import './App.css'

export default function Calculator() {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleEqualsClick = () => {
    try {
      setExpression(String(Function('"use strict";return (' + expression + ')')()));
    } catch {
      setExpression("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
  };

  return (
    <div className="calculator">
      <div className="display">{expression || "0"}</div>
      <div className="buttons">
        {[1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", 0, "C", "=", "/"].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === "=" ? handleEqualsClick() : btn === "C" ? handleClear() : handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
