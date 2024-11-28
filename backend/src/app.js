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


const app = express();
const server = http.createServer(app);
configureSocketIO(server);

app.use(cors());
app.use(bodyParser.json());

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

export default app;