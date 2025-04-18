import React from 'react'

function Loop() {
    let sum = 0;

    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 0) {
        console.log(i);
        sum += i;
      }
    }
    
    console.log("Sum of even numbers from 1 to 10:", sum);
    
}

export default Loop