import { User } from "../models/user.model.js";

const checkProfileCompletion = async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
  
    if (!user.isProfileComplete) {
        const deletedUser = await User.findByIdAndDelete(userId);
        return res.status(444).json({ message: "Complete your profile to continue." });
    }

    next();
};

export {checkProfileCompletion}