const userModel = require("../../models/user-model");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const secret = process.env.TOKEN_SECRET_KEY + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '10m' });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

        // Send email with the reset link
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'janae28@ethereal.email',
                pass: '3UX8qNKKJ2FbhhEyqu'
            }
        });

        const mailOptions = {
            from: 'no-reply@example.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Please click the following link to reset your password: ${link}`,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Email could not be sent', error: true });
            }
            res.status(200).json({ message: 'Email sent', success: true });
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = forgotPasswordController;
