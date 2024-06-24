// const mongoose = require('mongoose')


// const productSchema = mongoose.Schema({
//     productName: String,
//     brandName: String,
//     category: String,
//     productImage: [],
//     price: Number,
//     sellingPrice: Number,
//     description: String,
// }, {
//     timestamps: true
// }
// )

// const productModel =  mongoose.model("product",productSchema)
// module.exports = productModel

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
        required: true,
    },
    stripePriceId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const productModel =  mongoose.model("product",productSchema)
module.exports = productModel
