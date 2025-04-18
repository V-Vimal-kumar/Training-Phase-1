import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
      },
      age: {
        type: Number,
        min: [18, 'Age must be at least 18'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true, 
      }
})

const user=mongoose.model("user",userSchema)

export default user;