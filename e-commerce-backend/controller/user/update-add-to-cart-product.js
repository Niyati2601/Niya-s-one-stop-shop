const addToCartModel = require("../../models/cart-product")


const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userId;
        const { _id, quantity } = req.body;
        
        const updateResult = await addToCartModel.findByIdAndUpdate(
            _id,
            { productQuantity: quantity },
            { new: true } 
        );

        if (updateResult) {
            res.status(200).json({
                message: "Product Updated Successfully",
                data: updateResult,
                error: false,
                success: true
            });
        }

    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct