import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error("Vui lòng đăng nhập!");
        }
        const data  = verifyToken(token);
        req.user = data;
        next()
    }catch(err){
        console.log(err)
        next(err)
    }
}