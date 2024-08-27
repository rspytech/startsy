import { uploadOnCloudinary } from "../../cloudinary.js";
import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";

export const InvestorInfo = async (req, res) => {
    try {
        const { 
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            previousExperience,
            areaOfInterest,
            startupStage,
            preferredSector,
            investmentRange,
        } = req.body;

        const profilePhoto = req.files.profilePhoto;
        const pancardPhoto = req.files.panCardPhoto;

        if (!profilePhoto) {
            return res.status(400).json({ message: "Please upload a profile photo" });
        }
        
        const hashedPanCard = req.hashedPan;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        const encryptedPanCard = req.pan;
        
        const newInvestor = new Investor({
            fullName,
            country,
            age,
            gender,
            previousExperience,
            areaOfInterest,
            panCard: {
                index: hashedPanCard,
                pan: encryptedPanCard
            },
            startupStage,
            preferredSector,
            investmentRange,
            user_id: req.user._id
        });
        
        if(email){
            currentUser.email = email;
        }

        if(contactInfo){
            currentUser.contactInfo = contactInfo;
        }

        const uploadedPhoto = await uploadOnCloudinary(profilePhoto[0].path);
        const photoUrl = uploadedPhoto.secure_url;
        currentUser.profilePhoto = photoUrl;
        
        const pancardUploadedPhoto = await uploadOnCloudinary(pancardPhoto[0].path);
        const pancardPhotoUrl = pancardUploadedPhoto.secure_url;
        newInvestor.panCardPhoto = pancardPhotoUrl;

        await currentUser.save();
        await newInvestor.save();

        res.status(200).send({
            message: "Investor Details uploaded successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}
