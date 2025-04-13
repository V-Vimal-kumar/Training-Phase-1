import React from "react";

const PrimeList = React.memo(({ primes }) => {
  console.log("PrimeList rendered");
  return (
    <div>
      <h2>Prime Numbers:</h2>
      <ul>
        {primes.slice(0, 20).map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
    </div>
  );
});

export default PrimeList;
