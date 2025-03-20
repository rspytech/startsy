// const founderData = {
//     "revenue" : 500,
//     "startupStage" : "SeriesA",
//     "TAM" : 10000,
//     "SAM" : 7500,
//     "SOM" : 5000,
// };

// const idealData = {
//     "revenue" : 1000,
//     "startupStage" : "SeriesC",
//     "TAM" : 15000,
//     "SAM" : 9500,
//     "SOM" : 8000,
// };

// const startupStageHierarchy = {
//     "Ideation" : 1,
//     "PreSeed" : 2,
//     "Seed" : 3,
//     "SeriesA" : 4,
//     "SeriesB" : 5,
//     "SeriesC" : 6,
// };

// const calculateScore = (founderValue, idealValue) => {
//     return founderValue >= idealValue ? 1 : founderValue / idealValue;
// }

// export const readinessEvaluation = () => {
//     const totalFactors = Object.keys(founderData).length;
//     let readinessScore = 0;

//     // Calculate score for revenue, TAM, SAM, SOM
//     ["revenue", "TAM", "SAM", "SOM"].forEach(key => {
//         readinessScore += calculateScore(founderData[key], idealData[key]);
//     });

//     // Calculate score for startup stage
//     const totalStages = Object.keys(startupStageHierarchy).length;
//     const stageScore = startupStageHierarchy[founderData.startupStage] / totalStages;
//     readinessScore += stageScore;

//     return ((readinessScore / totalFactors) * 10).toFixed(1);
// };

// console.log(readinessEvaluation());
