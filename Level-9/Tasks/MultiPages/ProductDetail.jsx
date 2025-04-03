import React from "react";
import { useParams } from "react-router-dom";

const products = [
    { id: "1", name: "washing machine", description: "To wash the clothes" },
    { id: "2", name: "Mixer", description: "To grind" },
    { id: "3", name: "Fridge", description: "to cool!" }
  ];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  return product ? (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  ) : (
    <h2>Product not found</h2>
  );
};

export default ProductDetail;
