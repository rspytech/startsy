import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const checkCurrentPassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { password } = req.body;

        const user = await User.findById(userId);
        const userDbPassword = user.password;

        if (!userDbPassword) {
            return res.status(400).json({ message: "Db password not received" });
        }

        const isMatch = await bcrypt.compare(password, userDbPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        return res.status(200).json({ message: "Password Authentication Successfull" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Password Authentication Unsuccessfull" });
    }
};
