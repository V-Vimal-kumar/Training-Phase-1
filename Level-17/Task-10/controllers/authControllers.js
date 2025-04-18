const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const crypto = require('crypto');
const ResetToken = require('../models/ResetToken');
const { sendResetEmail } = require('../utils/email');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.create({ email, password, role });
  res.status(201).json({ token: generateToken(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user) });
};

exports.refreshToken = async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = generateToken({ _id: decoded.id, role: decoded.role });
    res.json({ token: newToken });
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'No user found' });

  const token = crypto.randomBytes(32).toString('hex');
  await ResetToken.create({ userId: user._id, token });

  await sendResetEmail(user.email, token);
  res.json({ message: 'Reset email sent' });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const reset = await ResetToken.findOne({ token });
  if (!reset) return res.status(400).json({ message: 'Invalid or expired' });

  const user = await User.findById(reset.userId);
  user.password = newPassword;
  await user.save();
  await ResetToken.deleteOne({ _id: reset._id });

  res.json({ message: 'Password updated' });
};

