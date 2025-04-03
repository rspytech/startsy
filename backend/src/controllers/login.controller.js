import { User } from "../models/user.model.js";

export const loginUser = async (req, res) => {
    try {
        const { identifier, password , notificationToken } = req.body;
        console.log(notificationToken , "yeh body mese hai");
        

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Please fill in all the fields' });
        }

        // Check if user exists
        const user = await User.findOne({
            $or: [
                { userName: identifier },
                { email: identifier },
                { contactInfo: identifier },
            ],
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify the password
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate tokens
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        // Save the refresh token to the database

        if(notificationToken){
            user.notificationToken = notificationToken;
        }
        user.refreshToken = refreshToken;
        await user.save();

        // Send tokens in the response body
        return res.status(200).json({
            message: "Login Successful",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
