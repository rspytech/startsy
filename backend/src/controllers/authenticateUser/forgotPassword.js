import { User } from "../../models/user.model.js";

export const forgotPassword = async(req, res) => {
    try {
        const {password, confirmPassword} = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!password || !confirmPassword){
            return res.status(400).json({message: "Please enter both password and confirm password."});
        }
 
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match."});
        }

        user.password = password;

        await user.save();

        return res.status(200).json({
            message: "Password updated successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message: "Failed to update password."});
    }
}