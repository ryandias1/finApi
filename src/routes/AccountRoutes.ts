import { Router, type Request, type Response } from "express";
import { accountController } from "../index.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const accountRoutes = Router()
accountRoutes.get("/", authMiddleware,  (req: Request, res: Response) => accountController.statement(req, res))
export {accountRoutes}