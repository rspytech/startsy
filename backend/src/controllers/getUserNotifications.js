import { Notification } from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all notifications and populate necessary fields
        let notifications = await Notification.find({ receivingUserId: userId })
            .sort({ createdAt: 1 })
            .populate("sendingUserId")
            .populate("postId");

        // Filter and transform notifications if needed
        notifications = notifications.map(notification => {
            if (notification.notificationType !== "upvotePost") {
                notification.postId = null; // Ensure postId is null for other types
            }
            return notification;
        });

        // Check if notifications exist
        if (!notifications.length) {
            return res.status(404).json({ message: "No notifications found" });
        }

        // Respond with notifications
        return res.status(200).json({
            message: "Notifications fetched successfully",
            data: notifications,
        });
    } catch (error) {
        // Log error (optional: include a logger here)
        return res.status(500).json({ message: "Error fetching notifications" });
    }
};
