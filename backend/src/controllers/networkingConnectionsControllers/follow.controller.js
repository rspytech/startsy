import { User } from "../../models/user.model.js";

export const followUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const followedUserId = req.params.id;

        // console.log(loggedInUserId, followedUserId);
        // console.log(loggedInUserId, followedUserId);
        // console.log(loggedInUserId, followedUserId);
        

        // Prevent users from following themselves
        if (loggedInUserId.toString() === followedUserId.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }

        // Update both users in parallel
        const [updatedLoggedInUser, updatedFollowedUser] = await Promise.all([
            User.findByIdAndUpdate(
                { _id: loggedInUserId },
                { $addToSet: { following: followedUserId } },
                { new: true }
            ),
            User.findByIdAndUpdate(
                { _id: followedUserId },
                { $addToSet: { followers: loggedInUserId } },
                { new: true }
            ),
        ]);

        // Fetch the users after updates
        const loggedInUserRole = await User.findById(loggedInUserId).populate("roleId");    // F
        const messagingUserRole = await User.findById(followedUserId).populate("roleId");   // C

        // console.log(loggedInUserRole);
        console.log(messagingUserRole);
        

        if (!messagingUserRole || !messagingUserRole.roleId) {
            return res.status(404).json({ message: "RoleId or user not found." });
        }

        if(loggedInUserRole.followers.includes(followedUserId)){
            return res.status(400).json({
                message: "You are already following this user."
            });
        }
        // Check if both are following each other
        if (
            loggedInUserRole.followers.includes(followedUserId) &&
            messagingUserRole.followers.includes(loggedInUserId)
        ) {

            const messagingUser = messagingUserRole.roleId;
            const loggedInUser = loggedInUserRole.roleId;

            await messagingUser.updateOne({ $addToSet: { chatUsers: loggedInUserId } });
            await loggedInUser.updateOne({ $addToSet: { chatUsers: followedUserId } });


            loggedInUser.requestNotifications = loggedInUser.requestNotifications.filter(
                (notification) => notification.investor.toString() !== followedUserId
            );

            await messagingUser.save();
            await loggedInUser.save();

            return res
                .status(200)
                .json({ message: "Message Authentication Successful and followed back." });
        }

        // Ensure `requestNotifications` exists
        if (!messagingUserRole.roleId.requestNotifications) {
            messagingUserRole.roleId.requestNotifications = [];
        }

        // Push notification
        messagingUserRole.roleId.requestNotifications.push({
            investor: loggedInUserId, // Save ID, not full object, for efficiency
            requestDate: Date.now(),
        });
        console.log(messagingUserRole.roleId.requestNotifications);
        // Save the updated role
        await messagingUserRole.roleId.save();

        console.log(messagingUserRole.roleId);

        
        return res.status(200).json({
            message: "User followed successfully, waiting for follow back.",
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error occurred while following user. ERROR: ${error.message}`,
        });
    }
};
