import jwt from "jsonwebtoken";

interface Payload{
    userId: string
}

const JWT_SECRET = process.env.JWT_SECRET as string

const createToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15m"
    });
}

const createRefreshToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    })
}

const verifyToken = (token: string): Payload => {
    try{
        return jwt.verify(token, JWT_SECRET) as Payload
    }catch(err){
        throw new Error("Token không hợp lệ!")
    }
}


export {
    verifyToken,
    createRefreshToken,
    createToken,
    Payload
}