const userModel = require("../../models/user-model");

async function allUsers(req,res){
    
    try {
        const allUsers = await userModel.find()
        res.status(200).json({
            message: "All Users fetched Successfully!!",
            data: allUsers,
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = allUsers