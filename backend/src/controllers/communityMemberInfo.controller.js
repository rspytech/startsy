import { uploadOnCloudinary } from "../../cloudinary.js";
import { CommunityMember } from "../models/communityMember.model.js";
import { User } from "../models/user.model.js";

export const CommunityMemeberInfo = async (req, res) => {
    req.body.certification = JSON.parse(req.body.certification)
    req.body.portfolio = JSON.parse(req.body.portfolio)
    try{
        const {
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            certification, 
            portfolio,
        } = req.body;

        const profilePhoto = req.file;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        const newCommunityMember = new CommunityMember({
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            certification, 
            portfolio,
            user_id: req.user._id
        });

        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
        const photoUrl = uploadedPhoto.secure_url;

        currentUser.profilePhoto = photoUrl;
        currentUser.email = email;
        currentUser.contactInfo = contactInfo;
        currentUser.roleId = newCommunityMember._id;
        
        await currentUser.save();
        await newCommunityMember.save();

        res.status(200).json({message: "Community Member created successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}