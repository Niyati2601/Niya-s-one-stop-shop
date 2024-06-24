const addToCartModel = require("../../models/cart-product");

async function addToCartProductView(req,res) {
    try {
        const currentUser = req?.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.status(200).json({
            message: "All Products",
            data: allProduct,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = addToCartProductView