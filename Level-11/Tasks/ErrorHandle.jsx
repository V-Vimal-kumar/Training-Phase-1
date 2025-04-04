
function ErrorHandle() {
    function divideNumbers(a, b) {
        if (b === 0) {
          throw new Error("Cannot divide by zero");
        }
        return a / b;
      }
      
      try {
        const result1 = divideNumbers(50, 2);
        console.log("Result:", result1);
      
        const result2 = divideNumbers(5, 0); 
        console.log("Result:", result2);
      } catch (error) {
        console.log("Error:", error.message);
      } finally {
        console.log("Finished division attempt.");
      }
      
}

export default ErrorHandle