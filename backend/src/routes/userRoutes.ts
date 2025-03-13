import express from 'express';
import UserController from '../controllers/UserController';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();
router.get('/', auth, adminOnly, UserController.getAllUsers);

export default router;