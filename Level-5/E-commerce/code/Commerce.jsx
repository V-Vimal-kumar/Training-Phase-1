import React ,{ useState } from "react";
import { ShoppingCart } from "lucide-react";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/laptops/50-series/geforce-rtx-50-series-laptops-learn-og-1200x630@2x.jpg", price: "$999" },
  { id: 2, name: "Smartphone", imageUrl: "https://www.livemint.com/lm-img/img/2024/08/10/600x338/akhil-yerabati-4YmSIWff6aw-unsplash_1717145686026_1723269465941.jpg", price: "$699" },
  { id: 3, name: "Headphones", imageUrl: "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg", price: "$199" },
];

const Product = ({ product, addToCart }) => (
  <div className="card">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">{product.price}</p>
    <button onClick={() => addToCart(product)} className="add-to-cart">Add to Cart</button>
  </div>
);

export default function ProductListing() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Products</h2>
        <div className="cart-container">
          <ShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="cart-count">{cart.length}</span>
          )}
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
