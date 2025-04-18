function HighOrder() {
function operateOnArray(arr, operation) {
    return arr.map(operation);
  }
  
  const double = num => num * 2;
  const square = num => num ** 2;
  const toString = num => num.toString();
  
  const numbers = [1, 2, 3, 4, 5];
  
  console.log("Doubled:", operateOnArray(numbers, double));
  console.log("Squared:", operateOnArray(numbers, square));
  console.log("Stringified:", operateOnArray(numbers, toString));
  
}

export default HighOrder