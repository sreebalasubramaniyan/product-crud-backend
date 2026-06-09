const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { register, login, getMe } = require("../controllers/auth.controller.js")
const verifyToken = require("../middleware/auth.middleware.js")

// Regular auth routes
router.post("/register", register)
router.post("/login", login)
router.get("/me", verifyToken, getMe)

module.exports = router