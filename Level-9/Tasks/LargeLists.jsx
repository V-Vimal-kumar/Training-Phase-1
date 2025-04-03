import React from "react";

const LargeList = React.memo(({ items }) => {
  console.log("LargeList rendered");
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

export default LargeList;
