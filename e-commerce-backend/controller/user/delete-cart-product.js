const addToCartModel = require("../../models/cart-product")

async function deleteCartProduct(req,res) {
    try {

        const currentUser = req?.userId
        const productCartId = req.body._id
        
        const deletedCartProduct = await addToCartModel.findByIdAndDelete(productCartId)

        if (deletedCartProduct) {
            res.status(200).json({
                message: "Product Deleted Successfully",
                data: deletedCartProduct,
                error: false,
                success: true
            });
        }
    } catch (error) {
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteCartProduct