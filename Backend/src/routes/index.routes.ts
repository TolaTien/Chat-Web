import userRouters from "./user.routes";

import { Router } from "express";

const apiRouter: Router = Router();

apiRouter.use("/api", userRouters)

export default apiRouter