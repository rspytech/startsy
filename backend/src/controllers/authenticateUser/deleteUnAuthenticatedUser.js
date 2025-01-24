import { User } from "../../models/user.model.js";

export const deleteUnAuthenticatedUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({ message: "Unauthorized User for delteing the user. Id not found" });
        }
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            message: "Incomplete User Deleted Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error while deleting the unauthorised user" });
    }
}