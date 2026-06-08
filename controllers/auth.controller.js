const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model.js")

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

// Register new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Generate token
    const token = generateToken(user)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login, getMe }