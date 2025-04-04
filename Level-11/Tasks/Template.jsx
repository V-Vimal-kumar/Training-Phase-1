import React from 'react'

function Template() {
    
    const firstName = "Vimal";
    const lastName = "Raj";
    const age = 20;
    
    const sentence = `My name is ${firstName} ${lastName} and I am ${age} years old.`;
    
    const multiLine = `
    Hello, ${firstName}!
    Next year, you will be ${age + 1}.
    `;
    
    const ageMessage = `${age >= 18 ? "You are an adult" : "You are a minor"}`;
    
    console.log(sentence);
    console.log(multiLine);
    console.log(ageMessage);
    
}

export default Template