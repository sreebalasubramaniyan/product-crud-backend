const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 6
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User