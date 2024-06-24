const mongoose = require('mongoose')


const addToCart = mongoose.Schema({
    productId: {
        ref : 'product',
        type : String,
    },
    productQuantity: Number,
    userId: String,
}, {
    timestamps: true
}
)

const addToCartModel =  mongoose.model("addToCart",addToCart)
module.exports = addToCartModel