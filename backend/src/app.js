import express from "express";
import authRoute from './routes/auth.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoute);

export default app;