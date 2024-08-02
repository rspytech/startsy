import express from 'express';
import { registerUser } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/register', registerUser);

export default router;