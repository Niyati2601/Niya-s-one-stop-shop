const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/product-model");

async function updateProductController(req,res) {
    try {
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)) {
            res.status(400).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }
        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(200).json({
            message: "Product Updated Successfully",
            data: updateProduct,
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

module.exports = updateProductController