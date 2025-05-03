const User = require('../Model/user');
const generateOTP = require('../Utils/generateOTP');
const sendEmail = require('../Utils/sendEmail'); // or sendSMS
const jwt = require('jsonwebtoken');

// 1. Send OTP (for login or signup)
exports.sendOTP = async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone is required' });
  }

  try {
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      // If user doesn't exist, provide temporary values for required fields
      user = new User({
        email,
        phone,
        firstName: 'Temp',
        lastName: 'User',
        otp,
        otpExpiresAt
      });
    } else {
      // Update existing user with new OTP
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
    }

    await user.save();

    // Send OTP via email or SMS
    await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Send OTP error:', err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// 2. Verify OTP and complete signup/login
exports.verifyOTP = async (req, res) => {
  const { email, phone, firstName, lastName, otp } = req.body;

  if (!otp || (!email && !phone)) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // New user signup flow
    if (!user.isVerified) {
      if (!firstName || !lastName) {
        return res.status(400).json({ message: 'Signup requires first and last name' });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.isVerified = true;
    }

    // Clear OTP and generate JWT
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ message: 'OTP verification failed' });
  }
};
