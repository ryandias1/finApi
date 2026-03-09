import { OperationEntitySchema, type DepositDTO, type TransferDTO, type WithdrawDTO } from "../model/Operation.js";
import type { OperationRepository } from "../repository/implementations/OperationRepository.js";
import type { AccountService } from "./AccountService.js";
import type { UserService } from "./UserService.js";
import { randomUUID } from "node:crypto";

export class OperationService {
    constructor(
        private readonly operationRepository: OperationRepository,
        private readonly userService: UserService,
        private readonly accountService: AccountService
    ) {}

    async deposit(id: string, depositDto: DepositDTO) {
        const { amount  } = depositDto
        if (amount <= 0) throw new Error("Valor invalido para deposito")
        const accountId = await this.accountService.getAccountByUser(id)
        const operationId = randomUUID()
        const operation = await this.operationRepository.deposit(operationId, accountId, depositDto)
        return OperationEntitySchema.parse(operation)
    }

    async withdraw(id: string, withdrawDto: WithdrawDTO) {
        const { amount  } = withdrawDto
        if (amount <= 0) throw new Error("Valor invalido para saque")
        const accountId = await this.accountService.getAccountByUser(id)
        const operationId = randomUUID()
        const operation = await this.operationRepository.withdraw(operationId,accountId, withdrawDto)
        return OperationEntitySchema.parse(operation)
    }

    async transfer(userSenderId: string, transferDto: TransferDTO) {
        const { amount, receiverAccountId  } = transferDto
        if (amount <= 0) throw new Error("Valor invalido para transferencia")
        const accountSenderId = await this.accountService.getAccountByUser(userSenderId)
        const operationId = randomUUID()
        const transfer = await this.operationRepository.transfer(operationId, accountSenderId, transferDto)
        return OperationEntitySchema.parse(transfer)
    }
}