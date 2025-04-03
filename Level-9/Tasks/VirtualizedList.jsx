import React from "react";
import { FixedSizeList as List } from "react-window";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = React.memo (({ index, style }) => (
  <div style={{ ...style, padding: "10px", borderBottom: "1px solid #ddd" }}>
    {items[index]}
  </div>
));

const VirtualizedList = () => {
  return (
    <div style={{ width: "300px", height: "400px", border: "1px solid black" }}>
      <h2>Large List (10,000 Items)</h2>
      <List
        height={350} 
        itemCount={items.length} 
        itemSize={35} 
        width={300} 
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;
