import type { Request, Response } from "express";
import type { OperationService } from "../service/OperationService.js";
import { DepositDtoSchema, TransferDtoSchema, WithdrawDtoSchema } from "../model/Operation.js";

export class OperationController {
    constructor(private readonly operationService: OperationService) {}

    async deposit(req: Request, res: Response) {
        const {userId} = res.locals
        const data = DepositDtoSchema.parse(req.body)
        const operationDone = await this.operationService.deposit(userId, data)
        return res.status(201).json(operationDone)
    }

    async withdraw(req: Request, res: Response) {
        const {userId} = res.locals
        const data = WithdrawDtoSchema.parse(req.body)
        const operationDone = await this.operationService.withdraw(userId, data)
        return res.status(201).json(operationDone)
    }

    async transfer(req: Request, res: Response) {
        const {userId} = res.locals
        const data = TransferDtoSchema.parse(req.body)
        const operationDone = await this.operationService.transfer(userId, data)
        return res.status(201).json(operationDone)
    }
}