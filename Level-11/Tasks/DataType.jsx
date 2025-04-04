import React from 'react'

function DataType() {

let myString = "Hello, Vimal!";
let myNumber = 42;
let myBoolean = true;
let myNull = null;
let myUndefined;
let myObject = { name: "Vimal", age: 21 };

console.log("Type of myString:", typeof myString);      
console.log("Type of myNumber:", typeof myNumber);       
console.log("Type of myBoolean:", typeof myBoolean);    
console.log("Type of myNull:", typeof myNull);          
console.log("Type of myUndefined:", typeof myUndefined);
console.log("Type of myObject:", typeof myObject);  

}

export default DataType  

