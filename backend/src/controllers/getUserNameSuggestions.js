import { User } from "../models/user.model.js";

export const getUserNameSuggestions = async (req, res) => {
    try {
        let {userName} = req.params;
        userName = userName.substring(1,);
        const userSuggestions = await User.find({
            userName : {$regex: `^${userName}`, $options: "i"}
        }).limit(3).filter((user) => user.role !== "Investor");

        if(!userSuggestions){
            return res.status(400).json({message: "No matching users found"});
        }
        return res.status(200).json({
            message: "User name suggestions found",
            data: userSuggestions,
        })
    }
    catch (error) {
        return res.status(404).json({
            message: "Error fetching user suggestions",
            error: error.message,
        })
    }
}