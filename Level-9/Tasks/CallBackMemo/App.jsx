// import React, { useState, useEffect } from "react";
// import LargeList from "./LargeLists";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => prev + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <LargeList items={items} />
//     </div>
//   );
// };

// export default App;


// import React, { useState, useMemo, useCallback } from "react";
// import PrimeList from "./CallBackMemo/PrimeList";
// import Button from "./CallBackMemo/Button";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [limit, setLimit] = useState(10000);

//   const primeNumbers = useMemo(() => {
//     console.log("Calculating prime numbers...");
//     const primes = [];
//     for (let num = 2; num <= limit; num++) {
//       if (primes.every((prime) => num % prime !== 0)) {
//         primes.push(num);
//       }
//     }
//     return primes;
//   }, [limit]);

//   const increment = useCallback(() => {
//     setCount((prev) => prev + 1);
//   }, []);

//   const handleLimitChange = useCallback((e) => {
//     setLimit(Number(e.target.value));
//   }, []);

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <Button onClick={increment}>Increment Counter</Button>
//       <input type="number" value={limit} onChange={handleLimitChange} />
//       <PrimeList primes={primeNumbers} />
//     </div>
//   );
// };

// export default App;

