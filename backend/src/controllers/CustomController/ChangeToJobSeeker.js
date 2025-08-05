import { User } from "../../models/user.model.js";

const updateToJobSeeker = async (req, res) => {
    try {
        const id = req.user._id;
        console.log(id);
        
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { role: "Job seeker" } },
            { new: true } // Returns the updated document
        );
        console.log(updatedUser);
        console.log(updatedUser.generateAccessToken());

        var token = updatedUser.generateAccessToken();
        
        

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Role updated successfully", user: updatedUser , token : token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export default updateToJobSeeker