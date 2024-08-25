import { User } from "../models/user.model.js";

export const CheckEmail = async (req, res) => {

    const { email } = req.body;

    try {
        
        if (await User.findOne(email)) {
            return res.status(409).send({
                message: "Email Already Exists, try a different one"
            });
        }

        return res.status(200);

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }

}