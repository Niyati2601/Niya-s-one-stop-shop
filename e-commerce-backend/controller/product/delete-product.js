const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/product-model");

async function deleteProductController(req,res) {
    
    try {
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)) {
            res.status(400).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }
        const {_id, resBody} = req.body

        const deleteProduct = await productModel.findByIdAndDelete(_id, resBody)

        res.status(200).json({
            message: "Product Deleted Successfully",
            data: deleteProduct,
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

module.exports = deleteProductController