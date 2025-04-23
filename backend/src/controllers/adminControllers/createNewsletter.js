import { Newsletter } from "../../models/newsletter.model.js";
import { uploadOnCloudinary } from "../../../cloudinary.js";
import { User } from "../../models/user.model.js";
import sendNotification from "../../utils/sendNotification.js";

export const createNewsletter = async (req, res) => {
    try {
        const { title, content, taggedUserName, leaderboardCategory } = req.body;

        const userId = req.user._id;
        const newsletterImage = req.file;

        const user = await User.findById(userId);
        const taggedUser = await User.findOne({ userName: taggedUserName });

        if (!["Investor", "Founder", "CommunityMember", "All", ""].includes(leaderboardCategory)) {
            return res.status(400).json({ message: "Invalid leaderboard category" });
        }

        const newsletter = new Newsletter({
            title,
            content,
            taggedUserName,
            taggedUser: taggedUser ? taggedUser._id : null,
            leaderboardCategory: leaderboardCategory || null,  // If empty, it won’t be on the leaderboard
        });
        console.log(newsletter.leaderboardCategory);
        console.log(newsletter);

        user.newslettersPosted.push(newsletter._id);

        let uploadedPhoto;
        try {
            uploadedPhoto = await uploadOnCloudinary(newsletterImage.buffer);
        } catch (err) {
            console.error("Cloudinary Upload Error:", err.message);
            return res.status(400).json({ message: "Error uploading to Cloudinary.", error: err.message });
        }

        if (!uploadedPhoto || !uploadedPhoto.secure_url) {
            return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
        }
        newsletter.newsletterImage = uploadedPhoto.secure_url;

        await newsletter.save();
        await user.save();

        var allUsers = await User.find()
        for (var items of allUsers) {
            var receiverIdToken = items.notificationToken;
            console.log(receiverIdToken, "yeh");
            var response = await sendNotification(receiverIdToken, ``, title )
        }

        return res.status(201).json({
            message: "Newsletter uploaded successfully",
            newsletter,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error uploading newsletter", error: error.message });
    }
};
