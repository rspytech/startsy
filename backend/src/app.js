import express from "express";
import http from "http";
import { configureSocketIO } from "./socket/socketIo.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import authRoute from './routes/auth.routes.js';
import investorRoute from './routes/investor.routes.js';
import founderRoute from './routes/founder.routes.js';
import postRoute from './routes/post.routes.js';
import chatRoute from './routes/chat.routes.js';
import googleAuthRoute from "./routes/google.auth.routes.js";
import connectionsRoute from "./routes/connection.routes.js"
import adminRoute from "./routes/admin.routes.js";
import notificationRoute from "./routes/notifications.routes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connection successful");
        
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();
const server = http.createServer(app);
configureSocketIO(server);

app.use(cors(
    {
        origin: ["*"],
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cookieSession({
    name: 'session',
    keys: ['s5Lcz9k9mRkA5O5xT7n9R8l2sE6QvB8y'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use('/api', authRoute);
app.use('/investor', investorRoute);
app.use('/founder', founderRoute);
app.use('/posts', postRoute);
app.use('/chats', chatRoute);
app.use('/auth', googleAuthRoute);
app.use('/connections', connectionsRoute);
app.use('/admin', adminRoute);
app.use('/notification', notificationRoute);

server.listen(5002, '0.0.0.0', () => {
    console.log('Server');
});
export default app;