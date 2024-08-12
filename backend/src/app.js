import express from "express";
import authRoute from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', authRoute);

export default app;