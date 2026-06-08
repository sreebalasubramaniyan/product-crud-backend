const Product = require("../models/product.model.js")
const { cloudinary } = require('../config/cloudinary.js')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id, userId: req.user.id });
        if (!product) return res.status(404).send("Product Not Found")
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            userId: req.user.id
        }

        // If there's a file uploaded, add image info
        if (req.file) {
            productData.image = req.file.path
            productData.imagePublicId = req.file.filename
        }

        const product = await Product.create(productData);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body }

        // If there's a new file uploaded, add image info
        if (req.file) {
            // Find old product to get old image public ID
            const oldProduct = await Product.findOne({ _id: id, userId: req.user.id })

            // Delete old image from Cloudinary if exists
            if (oldProduct && oldProduct.imagePublicId) {
                try {
                    await cloudinary.uploader.destroy(oldProduct.imagePublicId)
                } catch (err) {
                    console.log("Error deleting old image:", err)
                }
            }

            updateData.image = req.file.path
            updateData.imagePublicId = req.file.filename
        }

        const product = await Product.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find product first to get image public ID
        const product = await Product.findOne({ _id: id, userId: req.user.id })

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete image from Cloudinary if exists (don't fail if this errors)
        if (product.imagePublicId) {
            try {
                await cloudinary.uploader.destroy(product.imagePublicId)
            } catch (err) {
                console.log("Error deleting image from Cloudinary:", err)
            }
        }

        // Delete product from database
        await Product.findOneAndDelete({ _id: id, userId: req.user.id })

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }