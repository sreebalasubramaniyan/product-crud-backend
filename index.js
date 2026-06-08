require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/product.model.js")
const productRoutes = require("./routes/product.route.js")
const authRoutes = require("./routes/auth.route.js")
const cors = require("cors")
const app = express()
const users  = [
  {
    id: "u_01J8X",
    isActive: true,
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    role: "Admin",
    age: 32,
    skills: ["JavaScript", "React", "Node.js"],
    address: {
      city: "Austin",
      country: "USA"
    }
  },
  {
    id: "u_02K9Y",
    isActive: false,
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    role: "Developer",
    age: 27,
    skills: ["Python", "Django", "PostgreSQL"],
    address: {
      city: "Toronto",
      country: "Canada"
    }
  },
  {
    id: "u_03L2Z",
    isActive: true,
    name: "Amara Diop",
    email: "amara.diop@example.com",
    role: "Designer",
    age: 29,
    skills: ["Figma", "UI/UX", "CSS/Tailwind"],
    address: {
      city: "Dakar",
      country: "Senegal"
    }
  },
  {
    id: "u_04M1A",
    isActive: true,
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    role: "Developer",
    age: 24,
    skills: ["JavaScript", "Vue.js", "Firebase"],
    address: {
      city: "Dublin",
      country: "Ireland"
    }
  },
  {
    id: "u_05N6B",
    isActive: false,
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    role: "Manager",
    age: 41,
    skills: ["Agile", "Scrum", "Jira"],
    address: {
      city: "Tokyo",
      country: "Japan"
    }
  }
];
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
// routes
app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes)


// home
app.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

// DataBase-connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected ✅")
    app.listen(3000, () => {
    console.log("Server running on port 3000")
})
})
.catch((err) => {
    console.log("Not connected ❌", err)
})