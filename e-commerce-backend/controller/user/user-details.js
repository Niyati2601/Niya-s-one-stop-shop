const userModel = require("../../models/user-model");

async function userDetailsController(req,res) {
        try {
            
            const user = await userModel.findById(req.userId)
            
            res.status(200).json({
                message: "User Details",
                data: user,
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

module.exports = userDetailsController