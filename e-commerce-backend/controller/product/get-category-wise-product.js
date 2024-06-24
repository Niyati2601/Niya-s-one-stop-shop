const productModel = require("../../models/product-model");

async function getCategoryWiseProduct(req, res) {
    try {
        const { category } = req.params;

        const product = await productModel.find({ category: category });
        
        res.status(200).json({
            message: "All Products fetched Successfully By Category!!",
            data: product,
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

module.exports = getCategoryWiseProduct