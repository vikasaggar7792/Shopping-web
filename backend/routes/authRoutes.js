const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Private
router.get("/me", protect, authController.getUserProfile);
router.put("/me", protect, authController.updateUserProfile);

// Admin test
router.get("/admin-test", protect, admin, (req, res) => {
  res.json({ success: true, message: "Admin Access Granted ✅", user: req.user });
});

module.exports = router;