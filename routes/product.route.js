const express = require("express")
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js")
const verifyToken = require("../middleware/auth.middleware.js")
const { upload } = require("../config/cloudinary.js")

// All product routes require authentication (to filter by user)
router.get("/", verifyToken, getProducts)
router.get("/:id", verifyToken, getProduct)
router.post("/", verifyToken, upload.single('image'), createProduct)
router.put("/:id", verifyToken, upload.single('image'), updateProduct)
router.delete("/:id", verifyToken, deleteProduct)


module.exports = router