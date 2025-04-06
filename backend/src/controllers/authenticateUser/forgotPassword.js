import { User } from "../../models/user.model.js";

export const forgotPassword = async(req, res) => {
    try {
        const {password, confirmPassword} = req.body;
        const {email} = req.body;
        console.log(password, confirmPassword, email,);
        const user = await User.findOne({email : email});
        console.log(user);
        

        

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