import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

const foods = mongoose.model('foods', recipeSchema)
 export default foods;