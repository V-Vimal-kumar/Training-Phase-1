
function Destruct() {
const product = {
    name: "Wireless Mouse",
    price: 500,
  };
  
  const { name, price} = product;
  
  console.log(name);     
  console.log(price);     
  
  
  function displayProduct({ name, price }) {
    return `Product: ${name}\nPrice: ₹${price}`;
  }
  
  console.log(displayProduct(product));
  
}

export default Destruct