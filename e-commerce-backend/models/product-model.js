const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    price: Number,
    sellingPrice: Number,
    description: String,
    stripeProductId: {
        type: String,
    },
    stripePriceId: {
        type: String,
    }
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema)
module.exports = productModel
