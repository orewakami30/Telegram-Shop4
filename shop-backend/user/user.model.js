const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  role:     { type: String, enum: ['customer', 'admin'], default: 'customer' },
  createdAt:{ type: Date, default: Date.now },
  profile:  {
    displayName: String,
    avatarUrl: String
  }
});

module.exports = mongoose.model('User', userSchema);