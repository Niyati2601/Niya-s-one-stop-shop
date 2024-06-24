// const addToCartModel = require("../../models/cart-product");

// async function addToCartController(req,res) {
//     try {
//         const {productId} = req?.body
//         const currentUser = req?.userId

//         const isProductAvailable = await addToCartModel.findOne({productId : productId})

//         if(isProductAvailable) {
//             res.status(400).json({
//                 message: "Product Already Added",
//                 error: true,
//                 success: false
//             })
//         }
//         const payload = {
//             productId : productId,
//             productQuantity: 1,
//             userId : currentUser
//         }

//         const addNewProductToCart = new addToCartModel(payload)
//         const saveProduct = await addNewProductToCart.save()


//         res.status(200).json({
//             message: "Product Added To Cart",
//             data: saveProduct,
//             error: false,
//             success: true
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = addToCartController
const addToCartModel = require("../../models/cart-product");

async function addToCartController(req, res) {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Check if the product is already in the cart for the current user
        let productInCart = await addToCartModel.findOne({ productId: productId, userId: currentUser });

        if (productInCart) {
            // If the product is already in the cart, increment its quantity
            productInCart.productQuantity += 1;
            const updatedProduct = await productInCart.save();

            return res.status(200).json({
                message: "Cart Updated",
                data: updatedProduct,
                error: false,
                success: true
            });
        } else {
            // If the product is not in the cart, add it with quantity 1
            const payload = {
                productId: productId,
                productQuantity: 1,
                userId: currentUser
            };

            const addNewProductToCart = new addToCartModel(payload);
            const saveProduct = await addNewProductToCart.save();

            return res.status(200).json({
                message: "Product added to cart",
                data: saveProduct,
                error: false,
                success: true
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = addToCartController;
