function assessRisk(inputs) {
    const weights = {
        fundingStatus: 10, //higest
        socialProof: 9, //high
        intellectualProperty: 8, //constant
        founderCommitment: 7, //constant
        stage: 6, //high
        responseRateToInvestors: 5, //constant
        founderExperience: 4, //medium
        startupGoalClarity: 3, //medium
        team: 2, //low
        founderAge: 1, //lowest
    };
    const maxInputValues = {
        fundingStatus: 10,
        stage: 10,
        team: 10,
        founderExperience: 10,
        socialProof: 10,
        startupGoalClarity: 10,
        founderAge: 10,
        responseRateToInvestors: 1,
        founderCommitment: 1,
        intellectualProperty: 1,
    };
    let weightedSum = Object.keys(weights).reduce((sum, key) => {
        return sum + (inputs[key] / maxInputValues[key]) * weights[key];
    }, 0);
    let maxWeightedSum = Object.values(weights).reduce((a, b) => a + b, 0);
    let normalizedScore = (weightedSum / maxWeightedSum) * 100;
    // Apply penalties based on how much each input deviates from the max
    let penalty = Object.keys(inputs).reduce((penaltySum, key) => {
        let deficiency = 1 - inputs[key] / maxInputValues[key];
        return penaltySum + deficiency * weights[key];
    }, 0);
    let finalScore = Math.max(normalizedScore - penalty, 0);
    let riskFactor = finalScore <= 40 ? "High Risk" : finalScore <= 70 ? "Medium Risk" : "Low Risk";
    return { score: Math.round(finalScore), riskFactor };
}
const startupData = {
    fundingStatus: 10, //higest
    socialProof: 10, //high
    intellectualProperty: 1, //high+binary
    founderCommitment: 1, //medium+binary
    stage: 5, //medium
    responseRateToInvestors: 0, //medium+binary
    founderExperience: 0, //medium
    startupGoalClarity: 0, //low
    team: 0, //low
    founderAge: 0, //lowest
};

const result = assessRisk(startupData);
console.log(`Final Score: ${result.score} (Risk Factor: ${result.riskFactor})`);
