const jwt = require('jsonwebtoken');
const User = require('../Model/user');

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: "Token missing, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-otp -otpExpiresAt');
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
