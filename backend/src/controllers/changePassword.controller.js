import { User } from "../models/user.model.js";

export const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const { newPassword, confirmPassword } = req.body;
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Password feilds are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Password does not matches" });
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while changing password" });
    }
};
