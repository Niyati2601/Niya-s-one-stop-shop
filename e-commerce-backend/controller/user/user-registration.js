const userModel = require("../../models/user-model");
const bcrypt = require("bcryptjs");

async function userRegistrationController(req, res) {
    try {
        const { name, email, phone, password,image } = req.body;
        

        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error("User Already Exists");
        }

        if (!email) {
            throw new Error("Please Provide Email");
        }
        if (!password) {
            throw new Error("Please Provide Password");
        }
        if (!name) {
            throw new Error("Please Provide Name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong!! Please try again after some time!!");
        }

        const payload = {
            name,
            email,
            phone,
            password: hashPassword,
            image,
            role: "USER",
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Created Successfully",
        });
    } catch (error) {

        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userRegistrationController;
