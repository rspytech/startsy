import { User } from "../../models/user.model.js";

export const getAllUsersWithStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const {userIdsArray} = req.body;
        console.log(req.body);

        console.log(userIdsArray);
        

        // Fetch logged-in user's role and connections
        const user = await User.findById(userId).populate("roleId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const chatUsers = user.roleId?.chatUsers || []; // Ensure chatUsers exists
        const allUsers = await User.find(
            { _id: { $in: userIdsArray } }
        ).select("userName role profilePhoto");

        console.log(allUsers);
        

        const usersWithStatus = allUsers.map(u => {
            const plainUser = u.toObject();

            // If the user is in chatUsers -> "Connected"
            if (chatUsers.some(cu => cu.equals(u._id))) {
                return { ...plainUser, status: "Connected" };
            }
            // If the logged-in user has sent a request (is in followers) -> "Request Sent"
            else if (u.followers?.some(f => f.equals(userId))) {
                return { ...plainUser, status: "Request Sent" };
            }
            // If not in any category -> "Connect"
            else {
                return { ...plainUser, status: "Connect" };
            }
        });

        return res.status(200).json({
            message: "All users with connection status",
            data: usersWithStatus,
        });
    } catch (error) {
        console.error("Error fetching users with status:", error);
        return res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};