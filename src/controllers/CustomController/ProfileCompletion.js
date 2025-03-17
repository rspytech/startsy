const profileWeights = {
    Investor: {
        fullName: 2, email: 2, contactInfo: 2, country: 7, age: 1, gender: 1,
        profilePhoto: 5, previousExperience: 8, panCard: 10,  panCardPhoto: 5, investorType: 10, startupStage: 12,  preferredSector: 12,investmentRange: 15, linkedInUrl: 3, websiteUrl: 2, domainEmail: 3
        
    },
    Founder: {
        fullName: 2, email: 2, contactInfo: 2, country: 7, age: 1, gender: 1,
        profilePhoto: 5, nameOfStartup: 11, goal: 11, description: 15,
        teamInfo: 1, sector: 12, fundingStatus: 10, stageOfStartup: 12,
        previousWorkExperience: 1, education: 2, skills: 3, socialProof: 2
    },
    CommunityMember: {
        fullName: 2, email: 2, country: 5, age: 3, gender: 3, contactInfo: 6,
        communityMemberRole: 12, areaOfInterest: 10, contentPrefrence: 8,
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
        let value = userProfile[field];

        if (["sector", "fundingStatus", "stageOfStartup", "socialProof"].includes(field)) {
            value = userProfile.hiddenInfo?.[field];
        }

        if (["email","profilePhoto"].includes(field)){
            value = userProfile.user_id?.[field];
        }

        // console.log(`🔹 Checking field: ${field}`);
        // console.log(`🔹 Type of value:`, typeof value);
        // console.log(`🔹 Is Array:`, Array.isArray(value));
        // console.log(`🔹 Field content:`, value);


        // Handle `socialProof` first to avoid being skipped too early
        

        //General validation for other fields
        if (
            
            value !== "" &&
            !(Array.isArray(value) && value.length === 0) &&
            !(typeof value === "object" && Object.keys(value).length === 0)
        ) {
            if (Array.isArray(value) && typeof value[0] === "object") {
                const isValid = value.some(obj =>
                    Object.keys(obj)
                        .filter(key => key !== "_id" && key !== "tag") // Ignore `_id` and `tag`
                        .every(key => obj[key] !== "" && obj[key] !== null && obj[key] !== undefined)
                );

                if (isValid) {
                    // console.log(`✅ Adding ${weights[field]} for ${field} (Valid Object Found)`);
                    completedWeight += weights[field];
                } else {
                    // console.log(`❌ Skipping ${field}, no valid object found`);
                }
            } else {
                // console.log(`✅ Adding ${weights[field]} for ${field} (Valid Direct Field)`);
                completedWeight += weights[field];
            }
        } else {
            // console.log(`❌ Skipping ${field}, invalid or missing`);
        }
    }

    // console.log(`Total Weight: ${totalWeight}, Completed Weight: ${completedWeight}`);

    return completedWeight;
};