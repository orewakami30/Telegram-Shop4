const User = require('./auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ username, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  // You should use your secret from process.env
  const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET || 'changeme', { expiresIn: '2h' });
  return { token, user: { id: user._id, username: user.username, email: user.email } };
};
