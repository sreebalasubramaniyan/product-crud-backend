const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const { register, login, getMe } = require("../controllers/auth.controller.js")
const verifyToken = require("../middleware/auth.middleware.js")

// Regular auth routes
router.post("/register", register)
router.post("/login", login)
router.get("/me", verifyToken, getMe)

// Google OAuth routes
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}))

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Redirect to frontend with token
    res.redirect(`https://product-crud-frontend-one.vercel.app?token=${token}`);
  }
);

module.exports = router