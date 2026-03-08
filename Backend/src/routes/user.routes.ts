import User from "../controllers/user.controller";
import { authUser } from "../middlewares/auth";
import { Router } from "express";
import upload from "../middlewares/upload"

const userRouters: Router = Router();

userRouters.post('/register', User.register)
userRouters.get('/getUser',authUser, User.getUser)
userRouters.post('/login', User.login);
userRouters.post('/logout', authUser, User.logout);
userRouters.post('/upload', authUser, upload.single("avatar") , User.updateProfile)

export default userRouters;