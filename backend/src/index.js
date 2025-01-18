import mongoose from "mongoose";
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
    app.listen(process.env.PORT, () => {
        console.log('Server started on port 5000');
    });
};

console.log(process.env.MONGODB_URI)
// Connect to MongoDB and start server
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connection successful");
        return startServer();
    })
    .catch((error) => {
        console.log(error);
    });