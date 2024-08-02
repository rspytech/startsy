import mongoose from "mongoose";
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

// const connectDb = async () => {
//     try{
//         console.log(process.env.MONGODB_URI)
//         const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
//         console.log("MongoDb Connection Successfull", connectInstance.connection.host);
//     }
//     catch(error){
//         console.log("MongoDb Connection Failed", error);
//     }
// }

// connectDb().then(() => {
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running successfully on port ${process.env.PORT}`);
//     });
// })
// .catch((error) => console.log("Error while running app", error));

const startServer = async () => {
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
};

// Connect to MongoDB and start server
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connection successful");
        return startServer();
    })
    .catch((error) => {
        console.log(error);
    });