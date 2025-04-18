import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  isActive: { type: Boolean, default: true }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.post('save', function (doc) {
  console.log(`New user created: ${doc.email}`);
});

userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

userSchema.methods.generateProfile = function () {
  return {
    name: this.name,
    email: this.email,
    age: this.age
  };
};

userSchema.statics.findByEmailDomain = function (domain) {
  return this.find({ email: new RegExp(`@${domain}$`, 'i') });
};

export default mongoose.model('User', userSchema);
