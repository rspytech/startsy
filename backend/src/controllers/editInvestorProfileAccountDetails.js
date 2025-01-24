import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";

export const editInvestorAccountProfileDetails = async (req, res) => {

    console.log(req.body);
    console.log(req.file);
    
    
    const {
        fullName,
        country,
        contactInfo,
        previousExperience,
        startupStage,
        preferredSector,
        investmentRange
    } = req.body;

    const profilePhoto = req.file;

    try {
        // Get the current user
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the existing investor profile
        let investor = await Investor.findOne({ user_id: currentUserId });
        console.log(investor);
        

        // Define the fields to be updated
        const fieldsToUpdate = {
            fullName,
            country,
            contactInfo,
            previousExperience,
            startupStage,
            preferredSector,
            investmentRange
        };

        // Use a loop to update the fields dynamically
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (value) {
                investor[key] = value; // Update field if it's provided in the request
            }
        }

        // Handle profile photo upload
        if (profilePhoto) {
            let uploadedPhoto;
            try {
                uploadedPhoto = await uploadOnCloudinary(profilePhoto.buffer);
            } catch (err) {
                console.error("Cloudinary Upload Error:", err.message);
                return res.status(400).json({ message: "Error uploading to Cloudinary.", error: err.message });
            }

            if (!uploadedPhoto || !uploadedPhoto.secure_url) {
                return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
            }
            const photoUrl = uploadedPhoto.secure_url;  
            currentUser.profilePhoto = photoUrl; // Save the photo URL in the user model
        }

        // Save the user and investor documents
        await currentUser.save();
        await investor.save();

        res.status(200).send({
            message: "Investor Details updated successfully",
            investor,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }

}