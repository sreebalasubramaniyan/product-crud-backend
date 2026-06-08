const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter product name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    quantity:{
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false
    },
    imagePublicId: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
}
)


const Product = mongoose.model("Product",ProductSchema);

module.exports = Product;