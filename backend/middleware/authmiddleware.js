// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // User model

// ============================
// PROTECT MIDDLEWARE (Private Routes)
// ============================
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next(); // Go to next middleware or route
    } catch (error) {
      console.error("Protect Middleware Error:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// ============================
// ADMIN MIDDLEWARE
// ============================
const admin = (req, res, next) => {
  if (req.user && req.user.role && req.user.role.toLowerCase() === "admin") {
    next(); // User is admin, continue
  } else {
    res.status(403);
    throw new Error("Admin access only");
  }
};

module.exports = { protect, admin };