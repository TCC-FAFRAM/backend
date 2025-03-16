import express from 'express';
import { adminOnly, auth } from '../../middleware/auth';
import { UserController } from './UserController';

const userController = new UserController();
const userRouter = express.Router();

userRouter.get('/', auth, adminOnly, userController.getAll);
//userRouter.get('/:id', auth, adminOnly, userController.getById);
userRouter.post('/', auth, adminOnly, userController.create);
userRouter.post('/', auth, adminOnly, userController.update);
userRouter.post('/', auth, adminOnly, userController.delete);

export default userRouter;