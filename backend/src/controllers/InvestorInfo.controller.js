import { uploadOnCloudinary } from "../../cloudinary.js";
import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";

export const InvestorInfo = async (req, res) => {
    try {
        const { 
            contactInfo,
            previousExperience,
            areaOfInterest,
            startupStage,
            preferredSector,
            investmentRange,
        } = req.body;
        const profilePhoto = req.file;
        if(!contactInfo || !previousExperience || !areaOfInterest || !startupStage || !preferredSector || !investmentRange){
            return res.status(400).json({ message: "Please fill in all the fields" });
        }
        if(!profilePhoto){
            return res.status(400).json({ message: "Please upload a profile photo" });
        }
        const hashedPanCard = req.hashedPan;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        const encryptedPanCard = req.pan;
        const newInvestor = new Investor({
            contactInfo,
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

        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
        const photoUrl = uploadedPhoto.secure_url;
        currentUser.profilePhoto = photoUrl;
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
