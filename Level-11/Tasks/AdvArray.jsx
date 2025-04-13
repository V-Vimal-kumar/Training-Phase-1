import React from 'react'

function AdvArray() {
 const no=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

 const sqr=no.map(num=>num*num);
 const odd=no.filter(num=>num%2 !==0);
 const sum=no.reduce((prev,curr)=>prev=curr,0);

 console.log(`square:${sqr}`);
 console.log(`odd:${odd}`);
 console.log(`cum:${sum}`);

 no.forEach(num => {
    console.log(`Number: ${num}, Square Root: ${Math.sqrt(num).toFixed(2)}`);
  });
  
}

export default AdvArray