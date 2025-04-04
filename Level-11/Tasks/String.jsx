import React from 'react'

function String() {

    let fullName = "Vimal Kumar";
    let upperCaseName = fullName.toUpperCase();
    let nameLength = fullName.length;
    let firstName = fullName.split(" ")[0];
    
    let hometown = "Cbe";
    let combinedString = fullName + " from " + hometown;
    
    console.log(upperCaseName, nameLength, firstName, combinedString);
    
}

export default String