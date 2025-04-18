import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, products } = req.body;
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new AppError("Product not found", 404);
      if (product.stock < item.quantity)
        throw new AppError(`Not enough stock for ${product.name}`, 400);

      product.stock -= item.quantity;
      await product.save({ session });
      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create([{ user: userId, products, totalAmount }], { session });

    await User.findByIdAndUpdate(userId, {
      $push: { purchaseHistory: order[0]._id }
    }, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Order placed", order: order[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
});

export default router;
