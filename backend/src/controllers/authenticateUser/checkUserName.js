import { User } from "../../models/user.model.js";

export const checkUserName = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username not recieved" });
        }
        const user = await User.findOne({ userName: username });
        if (user) {
            return res.status(400).json({ message: "Username already taken" });
        }
        return res.status(200).json({ message: "Username is unique" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error while fetching userName for authentication" });
    }
};
