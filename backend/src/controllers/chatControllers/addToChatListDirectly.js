import { User } from "../../models/user.model.js";

export const addToChatDirectly = async (req, res) => {
    try {
        const jobApplicantUserId = req.params.id;
        const loggedInUserId = req.user._id;

        // Fetch both users concurrently using Promise.all
        const [jobApplicantUser, loggedInUser] = await Promise.all([
            User.findById(jobApplicantUserId).populate("roleId"),
            User.findById(loggedInUserId).populate("roleId"),
        ]);

        if (!jobApplicantUser || !loggedInUser) {
            return res.status(404).json({ message: "User(s) not found." });
        }

        const jobApplicantProfile = jobApplicantUser.roleId;
        const loggedInUserProfile = loggedInUser.roleId;

        if (!jobApplicantProfile || !loggedInUserProfile) {
            return res.status(404).json({ message: "User profiles not found." });
        }

        // Push user IDs into chatUsers
        jobApplicantProfile.chatUsers.push(loggedInUserId);
        loggedInUserProfile.chatUsers.push(jobApplicantUserId);

        // Save both profiles concurrently
        await Promise.all([jobApplicantProfile.save(), loggedInUserProfile.save()]);

        return res.status(200).json({ message: "Users added to each other's chat list successfully." });
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Error while adding users directly to chats", error: error.message });
    }
};
