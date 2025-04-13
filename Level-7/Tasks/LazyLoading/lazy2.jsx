import React, { useState } from "react";
import useIntersectionObserver from "./lazy";

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));

  const loadMoreItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...Array.from({ length: 10 }, (_, i) => `Item ${prevItems.length + i + 1}`),
    ]);
  };

  const observerRef = useIntersectionObserver(loadMoreItems, { threshold: 1 });

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={{ padding: "20px", border: "1px solid black" }}>
          {item}
        </div>
      ))}
      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
};

export default InfiniteScrollComponent;
