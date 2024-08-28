import { User } from "../models/user.model.js";

export const DoesUserExists = async (req, res) => {

    const { email, contactInfo } = req.body;

    try {
        
        if (await User.findOne({email})) {
            return res.status(409).send({
                message: "Email Already Associated with a different User, try different Logging In"
            });
        }

        if (await User.findOne({contactInfo})) {
            return res.status(409).send({
                message: "Phone Number Already Associated with a different User, try different Loggin In"
            });
        }

        return res.status(200);

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }

}