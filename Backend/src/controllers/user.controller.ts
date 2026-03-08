import { Request, Response, NextFunction } from "express";
import Users from "../models/user.model";
import bcrypt, { compareSync } from "bcrypt";
import { createToken, createRefreshToken } from "../services/jwt";
import cloudinary from "../config/cloudinary";
import { uploadStream } from "../middlewares/upload";



class User {

    // Đăng ký
    async register(req: Request, res: Response) {
        try{

        const { fullName, userName, email, password } = req.body;
        if(password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu phải ít nhất 6 kí tự"})
        }
        const user = await Users.findOne({ $or: [{email}, {userName}]})

        if(user){
            if(user.email === email){
                return res.status(400).json({ message: "Email đã tồn tại!"})
            }
            if(user.userName === userName){
                return res.status(400).json({ message: "Tài khoản đã tồn tại!"})
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({
            fullName,
            userName,
            email,
            password: hashPassword
        })

        const token = createToken({ userId: newUser._id.toString()});
        const refreshToken = createRefreshToken({ userId: newUser._id.toString()});

        res.cookie("token", token, {httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: "strict"});
        res.cookie("refreshtoken", refreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict"});

        await newUser.save();

        return res.status(200).json({newUser, token, refreshToken})


        }catch(err: any){
            return res.status(400).json({
                message: "Tạo tài khoản không thành công!",
                error: err.message
            });
        }
    }

    //Đăng nhập
    async login(req: Request, res: Response){
        try{
            const { email, password } = req.body;
            const user = await Users.findOne({email});

            if(!user || (! await bcrypt.compare(password, user.password))){
                return res.status(400).json({message: "Mật khẩu hoặc tài khoản không chính xác"})
            }
            const token = createToken({ userId: user._id.toString()});
            const refreshToken = createRefreshToken({ userId: user._id.toString()});

            res.cookie("token", token, {httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: "strict"});
            res.cookie("refreshtoken", refreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict"});

            return res.status(200).json({message: "Đăng nhập thành công", data: {user}, token, refreshToken })
            

        }catch(err: any){
            console.log("Đăng nhập thất bại", err.message)
            return res.status(500).json({message: "Lỗi server"})
        }
    }

    // Đăng xuất
    async logout(req: Request, res: Response){
        try{
            res.clearCookie("token", {httpOnly: true, sameSite: 'strict'});
            res.clearCookie("refreshtoken", {httpOnly: true, sameSite: 'strict'});

            return res.status(200).json({message: "Đăng xuất thành công"});
        }catch(err: any){
            console.log("Đăng xuất thất bại", err.message);
            return res.status(500).json({message: "Lỗi server"});

        }
    }

    //upload profile
        async updateProfile(req: Request, res: Response){
            try{
                
                const userId = req.user?.userId;

                if( !req.file ){
                    return res.status(400).json({message: "Hãy tải ảnh lên ảnh của bạn!"})
                }

                if (!req.file.mimetype.startsWith("image")) {
                return res.status(400).json({
                    message: "Vui lòng chỉ tải lên ảnh"
                });
                }

                const upload = await uploadStream(req.file.buffer)
                const updateUser = await Users.findByIdAndUpdate(userId, {avt: upload.secure_url}, { returnDocument: 'after' });
                return res.status(200).json({message: "Cập nhật ảnh đại diện thành công!", data: updateUser});
            }catch(err: any){
                console.log("Cập nhật ảnh đại diện thất bại",err);
                return res.status(500).json({message: "Lỗi server"})
            }
        }
    


    //getuser
    async getUser(req: Request, res: Response) {
        try{
            const userId = req.user?.userId;
            const user = await Users.findOne({ _id: userId });
            if(!user){
                return res.status(400).json({message: "User không tồn tại!"});
            }
            const nameUser = user?.fullName
            return res.status(200).json({message: "Lấy user thành công", data: nameUser})
        }catch(err){
            return res.status(400).json({message: "Lỗi server"})
        }

    }

}


export default new User()