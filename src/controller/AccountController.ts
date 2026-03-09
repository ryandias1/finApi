import type { Request, Response } from "express";
import type { AccountService } from "../service/AccountService.js";

export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    async statement(req: Request, res: Response) {
        const { userId } = res.locals
        const statement = await this.accountService.getStatement(userId)
        return res.status(200).json(statement)
    }
}