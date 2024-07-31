import { User } from '../models/user.model.js'; // Adjust the import path as necessary

export const registerUser = async (req, res) => {
    const { userName, email, password, isInvestor, isFounder, isFreelancer, isCommunityMember, profilePhoto } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            userName,
            email,
            password,
            isInvestor,
            isFounder,
            isFreelancer,
            isCommunityMember,
            profilePhoto
        });

        // Save the user to the database
        await newUser.save();

        // Generate tokens
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        // Respond with the new user and tokens
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                isInvestor: newUser.isInvestor,
                isFounder: newUser.isFounder,
                isFreelancer: newUser.isFreelancer,
                isCommunityMember: newUser.isCommunityMember,
                profilePhoto: newUser.profilePhoto
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
