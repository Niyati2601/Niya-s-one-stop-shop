const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/product-model");

async function uploadProductController(req, res) {
    try {

        const sessionUserId = req.userId
        
        if(!uploadProductPermission(sessionUserId)) {
            res.status(400).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }
        const uploadProduct = await productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(200).json({
            message: "Product Uploaded Successfully",
            data: saveProduct,
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

module.exports = uploadProductController