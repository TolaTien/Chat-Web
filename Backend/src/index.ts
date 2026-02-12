import express, {Application, Request, Response} from "express";
import "dotenv/config"
const app: Application = express();
const PORT =  process.env.PORT ;

app.get("/", (req: Request, res: Response) => {
    res.send("HELLO WORLD!")
})

app.listen(PORT, () =>{
    console.log(`Server is running ${PORT}`)
    
})