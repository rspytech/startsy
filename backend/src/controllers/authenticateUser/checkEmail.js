import {User} from "../../models/user.model.js"

export const checkEmail = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email ,!contactInfo){
            return res.status(400).json({message : "Email and contact number not recieved",});
        } 
        const user = await User.findOne({email : email});
        if(user){
            return res.status(400).json({message : "Email already taken"});
        } 
        return res.status(200).json({message : "Email is unique"});  
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({message : "Error while fetching email for authentication"});
    }
}