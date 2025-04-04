import React from 'react'

function FunDecl() {
    
    function multiply(a, b) {
        return a * b;
      }
      
      const divide = function (a, b) {
        return a / b;
      };
      
      const power = (base, exponent) => base ** exponent;
      
      console.log(multiply(5, 3));
      console.log(divide(10, 2));
      console.log(power(2, 4));
      
}

export default FunDecl