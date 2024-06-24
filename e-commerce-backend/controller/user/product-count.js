const addToCartModel = require("../../models/cart-product");

async function productCountController(req,res) {
    try {
        const userId = req?.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.status(200).json({
            message: "Product Count",
            data: count,
            error: false,
            success: true
        }) 
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = productCountController