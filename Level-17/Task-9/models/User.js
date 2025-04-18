import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  purchaseHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
  ]
});

export default mongoose.model("User", userSchema);
