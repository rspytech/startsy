import { User } from "../../models/user.model.js";

export const registerAdmin = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        const admin = new User({
            userName,
            email,
            password,
            role,
        });

        const accessToken = admin.generateAccessToken();

        await admin.save();
        res.status(200).send({
            message: 'Admin account created',
            accessToken,
        });
    }
    catch (error) {
        res.status(500).send({ 
            message: 'Error creating admin account',
            error: error.message,
         });
    }
};
