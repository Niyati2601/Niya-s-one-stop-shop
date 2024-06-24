const userModel = require("../models/user-model")

const uploadProductPermission = async(userID) => {
    const user = await userModel.findById(userID)

    if (user.role !== 'ADMIN') {
        return false
    }
    return true
}

module.exports = uploadProductPermission