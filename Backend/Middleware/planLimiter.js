const Todo = require('../Model/todo');

exports.planLimiter = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.plan === 'premium') {
      return next(); // allow unlimited
    }

    const todoCount = await Todo.countDocuments({ userId: user._id });

    if (todoCount >= 5) {
      return res.status(403).json({
        success: false,
        message: "Free plan limit reached. Upgrade to premium to add more todos.",
      });
    }

    next();
  } catch (err) {
    console.error("Plan check error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
