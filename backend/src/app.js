import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import authRoute from './routes/auth.routes.js';
import googleAuthRoute from "./routes/google.auth.routes.js";

const app = express();

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
app.use('/auth', googleAuthRoute);

export default app;