import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Vui lòng đăng nhập"});
        }
        const data  = verifyToken(token);
        if(!data){
            return res.status(401).json({message: "Token đã hết hạn"});
        }
        req.user = data;
        next()
    }catch(err: any){
        console.log(err)
        return res.status(401).json({message: "Token đã hết hạn"});
    }
}