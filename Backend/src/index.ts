import express, {Application, Request, Response} from "express";
import "dotenv/config"
import { createServer } from "http";
import {Server, Socket } from "socket.io"
import {connectDB} from "../src/config/connectDB"
import apiRouter from "./routes/index.routes"
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
const PORT =  process.env.PORT ;
const sever = createServer(app);

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(apiRouter )
app.use("/uploads", express.static("uploads"))

const io = new Server(sever, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
})

io.on("connection", (socket: Socket) => {
    console.log(socket.id)
})

app.get("/", (req: Request, res: Response) => {
    res.send("HELLO WORLD!")
})

sever.listen(PORT, () =>{
    console.log(`Server is running ${PORT}`);
    connectDB()
    
})