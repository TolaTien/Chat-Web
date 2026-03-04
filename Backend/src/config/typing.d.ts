import { Payload } from "../services/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: Payload
        }
    }
}