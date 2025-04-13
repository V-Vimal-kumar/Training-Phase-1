import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: "1", name: "washing machine", description: "To wash the clothes" },
  { id: "2", name: "Mixer", description: "To grind" },
  { id: "3", name: "Fridge", description: "to cool!" }
];

const ProductList = () => (
  <div>
    <h2>Products</h2>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
