import { uploadOnCloudinary } from "../../cloudinary.js";
import { Freelancer } from "../models/freelancer.model.js";
import { User } from "../models/user.model.js";

export const FreelancerInfo = async (req, res) => {
    try {
        const { 
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            tagline,
            skills,
            education,
            name,
            url,
            portfolio,
            services,
            currentAvailability,
            pricing,
        } = req.body;

        const profilePhoto = req.file;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        
        const newFreelancer = new Freelancer({
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            tagline,
            skills,
            education,
            certification : {
                name,
                url,
            },
            portfolio,
            services,
            currentAvailability,
            pricing,
            user_id: req.user._id
        });

        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
        const photoUrl = uploadedPhoto.secure_url;
        
        // set profile photo link, email, contactInfo of the current user in the User Model
        currentUser.profilePhoto = photoUrl;
        currentUser.email = email;
        currentUser.contactInfo = contactInfo;
        currentUser.roleId = newFreelancer._id;

        await currentUser.save();
        await newFreelancer.save();

        res.status(200).send({
            message: "Freelancer Details uploaded successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}
