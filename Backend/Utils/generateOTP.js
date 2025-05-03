// utils/generateOTP.js

const crypto = require('crypto');

const generateOTP = () => {
  // Generates a 6-digit numeric OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = generateOTP;
