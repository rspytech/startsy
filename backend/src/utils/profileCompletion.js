const profileWeights = {
    Investor: {
        fullName: 2, email: 2, contactInfo: 2, country: 2, age: 1, gender: 1,
        profilePhoto: 5, nameOfStartup: 11, goal: 11, description: 11,
        teamInfo: 6, sector: 12, fundingStatus: 10, stageOfStartup: 12,
        previousWorkExperience: 5, education: 2, skills: 3, socialProof: 2
    },
    Founder: {
        fullName: 2, email: 2, contactInfo: 2, country: 7, age: 1, gender: 1,
        profilePhoto: 5, nameOfStartup: 11, goal: 11, description: 15,
        teamInfo: 1, sector: 12, fundingStatus: 10, stageOfStartup: 12,
        previousWorkExperience: 1, education: 2, skills: 3, socialProof: 2
    },
    CommunityMember: {
        fullName: 2, email: 2, country: 5, age: 3, gender: 3, contactInfo: 6,
        communityMemberRole: 12, areaOfInterest: 10, contentPreference: 8,
        tagline: 5, skills: 10, education: 10, certification: 6, portfolio: 18
    }
};

// Function to calculate profile completion
export const calculateProfileCompletion = (userProfile, userRole) => {
    const weights = profileWeights[userRole];
    if (!weights) return 0;

    // Compute total possible weight
    const totalWeight = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
    
    let completedWeight = 0;

    for (const field in weights) {
        const value = userProfile[field];

        // Ensure field is valid (not empty, null, undefined, empty array/object)
        if (
                value !== "" &&
                !(Array.isArray(value) && value.length === 0) &&
                !(typeof value === "object" && Object.keys(value).length === 0)
        ) {
            if (Array.isArray(value) && typeof value[0] === "object") {
                // Check if at least one object is fully filled (no missing values)
                const isValid = value.some(obj =>
                    Object.values(obj).every(v => v !== "" && v !== null && v !== undefined)
                );
                
                if (isValid) {
                    // Add weight only if at least one object is fully valid
                    completedWeight += weights[field];
                }
            } else {
                // Normal case: Add weight if value is valid (not an array of objects)
                completedWeight += weights[field];
            }
        }
    }

    console.log(`Total Weight: ${totalWeight}, Completed Weight: ${completedWeight}`);


    return Math.round((completedWeight / totalWeight) * 100);
};