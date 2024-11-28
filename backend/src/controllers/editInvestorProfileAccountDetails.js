import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";

export const editInvestorAccountProfileDetails = async (req, res) => {
    const {
        fullName,
        country,
        age,
        gender,
        contactInfo,
        previousExperience,
        areaOfInterest,
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

        // Define the fields to be updated
        const fieldsToUpdate = {
            fullName,
            country,
            age,
            gender,
            contactInfo,
            previousExperience,
            areaOfInterest,
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
            const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
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
};
