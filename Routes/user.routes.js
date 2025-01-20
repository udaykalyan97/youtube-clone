import express from 'express';
import {signIn, signUp, logout} from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signUp",signUp)
userRouter.post('/login',signIn);
userRouter.post('/logout',logout);

export default userRouter;