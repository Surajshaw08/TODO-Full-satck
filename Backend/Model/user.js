const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  otpExpiresAt: {
    type: Date
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  subscriptionId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
