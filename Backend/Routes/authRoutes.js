const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../Controller/authController');  // ✅ Correct path

// Send OTP for login/signup
router.post('/send-otp', sendOTP);

// Verify OTP and login/signup user
router.post('/verify-otp', verifyOTP);

module.exports = router;
