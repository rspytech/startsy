import mongoose from "mongoose";
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try{
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("MongoDb Connection Successfull", connectInstance.connection.host);
    }
    catch(error){
        console.log("MongoDb Connection Failed", error);
    }
}

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running successfully on port ${process.env.PORT}`);
    });
})
.catch((error) => console.log("Error while running app", error));