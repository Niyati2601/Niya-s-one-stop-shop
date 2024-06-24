const productModel = require("../../models/product-model");

async function getAllProducts(req,res) {
    try {

        const allProducts = await productModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            message: "All Products fetched Successfully!!",
            data: allProducts,
            success: true,
            error: false,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = getAllProducts