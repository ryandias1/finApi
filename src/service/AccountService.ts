import { AppError } from "../errors/AppError.js";
import { AccountWithOperationsSchema, type accountWithOperationsDTO } from "../model/Account.js";
import type { AccountRepository } from "../repository/implementations/AccountRepository.js";

export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) {}

    async getStatement(id: string): Promise<accountWithOperationsDTO> {
        const allOperations = await this.accountRepository.getAccountStatement(id)
        if (!allOperations) throw new AppError("Conta não encontrada", 404)
        return AccountWithOperationsSchema.parse(allOperations)
    }

    async getAccountByUser(id: string) {
        const user = await this.accountRepository.findByUser(id)
        if (!user) throw new AppError("Usuario não existe", 404)
        return user.id
    }

    async getBalance(id: string) {
        const account = await this.accountRepository.findById(id)
        return account.balance
    }
}