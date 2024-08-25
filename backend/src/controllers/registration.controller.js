import { User } from '../models/user.model.js';

export const registerUser = async (req, res) => {
    try {
        const {userName, password, role} = req.body;
        console.log(req.body);
        if(!userName || !password || !role){
            return res.status(400).json({message: "Please fill in all fields."});
        }
        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            userName,
            email: "",
            password,
            role,
            refreshToken: ""
        });

        // Save the user to the database
        await newUser.save();

        // Generate tokens
        const refreshToken = newUser.generateRefreshToken();
        const accessToken = newUser.generateAccessToken();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // to prevent CSRF attacks
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // to prevent CSRF attacks
        });
        
        res.status(201).json({
            message: 'User registered successfully',
            newUser,
            accessToken,
            refreshToken
        });

        await User.updateOne(
            { email: email },
            {
                $set: {
                    refreshToken: refreshToken
                }
            },
            { upsert: false }
        )

        // Respond with the new user and tokens
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
