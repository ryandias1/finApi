import { AppError } from "../errors/AppError.js";
import { OperationEntitySchema, type DepositDTO, type TransferDTO, type WithdrawDTO } from "../model/Operation.js";
import type { OperationRepository } from "../repository/implementations/OperationRepository.js";
import { AccountService } from "./AccountService.js";
import { randomUUID } from "node:crypto";

export class OperationService {
    constructor(
        private readonly operationRepository: OperationRepository,
        private readonly accountService: AccountService
    ) {}

    async deposit(id: string, depositDto: DepositDTO) {
        const accountId = await this.accountService.getAccountByUser(id)
        const operationId = randomUUID()
        const operation = await this.operationRepository.deposit(operationId, accountId, depositDto)
        return OperationEntitySchema.parse(operation)
    }

    async withdraw(id: string, withdrawDto: WithdrawDTO) {
        const { amount } = withdrawDto
        const accountId = await this.accountService.getAccountByUser(id)
        const balance = await this.accountService.getBalance(accountId)
        if (amount > balance) throw new AppError("Saldo insuficiente", 422)
        const operationId = randomUUID()
        const operation = await this.operationRepository.withdraw(operationId,accountId, withdrawDto)
        return OperationEntitySchema.parse(operation)
    }

    async transfer(userSenderId: string, transferDto: TransferDTO) {
        const { amount } = transferDto
        const accountSenderId = await this.accountService.getAccountByUser(userSenderId)
        const balance = await this.accountService.getBalance(accountSenderId)
        if (amount > balance) throw new AppError("Saldo insuficiente", 422)
        const operationId = randomUUID()
        const transfer = await this.operationRepository.transfer(operationId, accountSenderId, transferDto)
        return OperationEntitySchema.parse(transfer)
    }
}