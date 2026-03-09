import { Router, type Request, type Response } from "express";
import { operationController } from "../index.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const operationRoutes = Router()
operationRoutes.use(authMiddleware)
operationRoutes.post("/deposit", (req: Request, res: Response) => operationController.deposit(req, res))
operationRoutes.post("/withdraw", (req: Request, res: Response) => operationController.withdraw(req, res))
operationRoutes.post("/transfer", (req: Request, res: Response) => operationController.transfer(req, res))
export {operationRoutes}