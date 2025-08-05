import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all notifications and populate necessary fields
        let notifications = await Notification.find({ receivingUserId: userId })
            .sort({ createdAt: 1 })
            .populate({
                path: "sendingUserId",
                select: "_id userName role profilePhoto"
            })
            .populate({
                path: "postId",
                select: "_id user_id type caption mediaUrl mediaType"
            });

        // pending request length
        var length = await User.findById(userId).populate("roleId").select("requestNotifications.investor")
        console.log('====================================');
        console.log(length.roleId.requestNotifications);
        console.log('====================================');

        const seen = new Set();
        const filtered = [];


        for (const item of length.roleId.requestNotifications) {
            const notifId = item.investor._id?.toString();
            console.log(notifId);
            if (!notifId) continue;
            if (!seen.has(notifId)) {
                seen.add(notifId);
                filtered.push(item);
            }
        }

        var finalLength = filtered.length
        console.log('====================================');
        console.log(finalLength , "pp");
        console.log('====================================');
        // console.log(length.roleId.requestNotifications.length, "ok");


        // Filter and transform notifications if needed
        notifications = notifications.map(notification => {
            if (notification.notificationType !== "upvotePost" && notification.notificationType !== "commentPost") {
                notification.postId = null; // Ensure postId is null for other types
            }
            return notification;
        });

        // Check if notifications exist
        if (!notifications.length) {
            return res.status(404).json({ message: "No notifications found", pendingRequest: finalLength });
        }

        // Respond with notifications
        return res.status(200).json({
            message: "Notifications fetched successfully",
            data: notifications,
            pendingRequest: finalLength
        });
    } catch (error) {
        // Log error (optional: include a logger here)
        return res.status(500).json({ message: "Error fetching notifications" });
    }
};
