import React from 'react'

function Recursive() {
    function factorial(n) {
        if (n < 0) {
          return "Not defined.";
        }
        if (n === 0 || n === 1) {
          return 1;
        }
        return n * factorial(n - 1);
      }
      
      console.log("Factorial of 5:", factorial(5));
      console.log("Factorial of 0:", factorial(0));
      console.log("Factorial of 1:", factorial(1));
      console.log("Factorial of 7:", factorial(7));
      console.log("Factorial of -3:", factorial(-3));
      
}

export default Recursive