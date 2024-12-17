import { Newsletter } from "../../models/newsletter.model.js";
import { uploadOnCloudinary } from "../../../cloudinary.js";
import { User } from "../../models/user.model.js";

export const createNewsletter = async (req, res) => {
    try {
        const {title, content, taggedUserName} = req.body;
        
        const userId = req.user._id;
        const newsletterImage = req.file;

        const user = await User.findById(userId);
        const taggedUser = await User.findOne({userName : taggedUserName});

        const newsletter = new Newsletter({
            title,
            content,
            taggedUserName,
            taggedUser : taggedUser._id,
        });

        await user.newslettersPosted.push(newsletter._id);

        const uploadedPhoto = await uploadOnCloudinary(newsletterImage.path);
        const photoUrl = uploadedPhoto.secure_url;

        newsletter.newsletterImage = photoUrl;

        await newsletter.save();
        await user.save();

        return res.status(201).json({
            message: "Newsletter uploaded successfully",
            newsletter,
        });
    } 
    catch (error) {
        return res.status(500).json({message: "Error uploading newsletter", error: error.message});
    }
}