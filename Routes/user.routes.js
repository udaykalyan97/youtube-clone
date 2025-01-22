import express from 'express';
import {signIn, signUp, logout, updateUser, getAllUsers} from "../Controllers/user.controller.js";
import auth from '../middleware/authentication.js';

const userRouter = express.Router();

userRouter.post('/signUp',signUp)
userRouter.post('/login',signIn);
userRouter.post('/logout',logout);
userRouter.put('/update', auth, updateUser);
userRouter.get('/allUsers', getAllUsers);

export default userRouter;