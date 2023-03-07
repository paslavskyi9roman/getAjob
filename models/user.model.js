const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'employer'],
      messages: 'please select correct role',
    },
    required: [true, 'Please select role'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minLength: [8, 'Password must be at least 8 characters long'],
    select: false,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model('User', userSchema);
