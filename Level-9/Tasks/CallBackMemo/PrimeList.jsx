import React from "react";

const PrimeList = React.memo(({ primes = [] }) => { 
  console.log("PrimeList rendered");
  return (
    <div>
      <h2>Prime Numbers:</h2>
      <ul>
        {primes.length > 0 ? (
          primes.slice(0, 20).map((prime, index) => (
            <li key={index}>{prime}</li>
          ))
        ) : (
          <li>No primes found</li>
        )}
      </ul>
    </div>
  );
});

export default PrimeList;
