const productModel = require("../../models/product-model");

async function searchProduct(req,res) {
    try {
        const search = req.query.q
        const regex = RegExp(search, 'i', 'g')

        const searchProduct = await productModel.find({
            $or: [
                { productName: regex },
                { category: regex },
            ]
        })

        res.status(200).json({
            message: "All Products fetched Successfully By Search!!",
            data: searchProduct,
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


module.exports = searchProduct