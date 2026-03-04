import User from "../controllers/user.controller";
import { authUser } from "../middlewares/auth";
import { Router } from "express";

const userRouters: Router = Router();

userRouters.post('/register', User.register)
userRouters.get('/getUser',authUser, User.getUser)
userRouters.post('/login', User.login);
userRouters.post('/logout', authUser, User.logout)

export default userRouters;