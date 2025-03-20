import { User } from "../../models/user.model.js";

const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const admin = await User.findOne({ email, role: 'Admin' });
        if (!admin) {
            return res.status(404).send('Admin not found');
        }
    
        const isPasswordCorrect = await admin.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).send('Invalid credentials');
        }
    
        const accessToken = admin.generateAccessToken(); 
        const refreshToken = admin.generateRefreshToken();

        admin.accessToken = accessToken;
        admin.refreshToken = refreshToken;

        await admin.save();

        return res.status(200).json({
            message : "Admin login successfull",
            accessToken: accessToken,
        });  
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error while log in for admin');
    }
}

export default loginAdmin;