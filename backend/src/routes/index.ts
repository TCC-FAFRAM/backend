import express from 'express';
import AuthRouter from '../entities/Auth/AuthRouter';
import UserRouter from '../entities/User/UserRouter';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/auth', AuthRouter);

export default router;