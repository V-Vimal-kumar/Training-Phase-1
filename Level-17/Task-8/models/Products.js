import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Products = mongoose.model('Product', productSchema);

export default Products;