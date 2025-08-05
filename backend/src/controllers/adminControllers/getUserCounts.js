import { User } from "../../models/user.model.js"

async function getUserCounts(req,res) {

    try {
        const [all , Investor , Founder , CommunityMember , Jobseeker ] = await Promise.all([
            User.countDocuments({ isProfileComplete: true }),
            User.countDocuments({ isProfileComplete: true, role: 'Investor' }),
            User.countDocuments({ isProfileComplete: true, role: 'Founder' }),
            User.countDocuments({ isProfileComplete: true, role: 'CommunityMember' }),
            User.countDocuments({ isProfileComplete: true, role: 'Job seeker' })
        ]);

        var data = {
            all , Investor , Founder , CommunityMember , Jobseeker
        }

        console.log(data);
        res.status(200).json({message : data})
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message : e})

    }

}


export default getUserCounts