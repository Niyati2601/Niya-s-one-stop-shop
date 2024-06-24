const productModel = require("../../models/product-model");

async function getCategoryProduct(req,res) {
    try {
        const productCategory = await productModel.distinct("category")
        
        const productByCategory = []

        for(const category of productCategory) {
            const products = await productModel.find({category})
            productByCategory.push({category, products})
        }

        res.status(200).json({
            message: "All Products fetched Successfully By Category!!",
            data: productByCategory,
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

module.exports = getCategoryProduct