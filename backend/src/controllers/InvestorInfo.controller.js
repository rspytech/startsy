import { uploadOnCloudinary } from "../../cloudinary.js";
import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";

export const InvestorInfo = async (req, res) => {

    const { 
        contactInfo,
        previousExperience,
        areaOfInterest,
        startupStage,
        preferredSector,
        investmentRange,
    } = req.body;

    const profilePhoto = req.files;     /* Testing Required */

    try {
        const hashedPanCard = req.hashedPan;
        const currentUserId = req.user._id;     /* Testing Required */
        const currentUser = await User.find(currentUserId);     /* Testing Required */
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
        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);        /* Testing Required */
        const photoUrl = uploadedPhoto.secure_url;        /* Testing Required */
        currentUser.profilePhoto = photoUrl;         /* Testing Required */
        await currentUser.save();       /* Testing Required */
        await newInvestor.save();

        res.status(200).send({
            message: "Investor Details uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
    

}
