import express from "express";
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

//Public Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//Private Routes
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/update', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;