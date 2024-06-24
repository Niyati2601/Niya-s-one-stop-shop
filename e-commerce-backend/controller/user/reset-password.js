const bcryptjs = require('bcryptjs');
const userModel = require('../../models/user-model');
const jwt = require("jsonwebtoken");

async function resetPassword(req, res) {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const secret = process.env.TOKEN_SECRET_KEY + user.password;
        try {
            const verify = jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const encryptedPassword = await bcryptjs.hash(password, 10);
        user.password = encryptedPassword;
        await user.save();

        return res.status(200).json({
            message: "Password Reset Successfully",
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = resetPassword;
