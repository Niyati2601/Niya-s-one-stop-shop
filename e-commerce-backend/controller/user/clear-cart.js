const addToCartModel = require("../../models/cart-product");

async function clearCart(req, res) {
    try {
        const currentUser = req.userId;
    
        const deletedCartProducts = await addToCartModel.deleteMany({ userId: currentUser });
        res.status(200).json({
            message: "Cart Cleared Successfully",
            data: deletedCartProducts,
            error: false,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = clearCart;
