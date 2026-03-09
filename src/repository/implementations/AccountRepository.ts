import { prisma } from "../../lib/prisma.js";
import { AccountWithOperationsSchema, type AccountResponseDTO, type CreateAccountDTO, type UpdateAccountBalanceDTO } from "../../model/Account.js";
import type { Repository } from "../Repository.js";

export class AccountRepository implements Repository<CreateAccountDTO, UpdateAccountBalanceDTO, AccountResponseDTO> {
    
    async getAccountStatement(userId: string) {
        const accountWithOperations = await prisma.account.findUnique({
            where: { userId },
            include: { 
                operations: {
                    orderBy: { createdAt: 'desc' }
                } 
            }
        });
        return AccountWithOperationsSchema.parse(accountWithOperations);
    }

    async create(account: CreateAccountDTO): Promise<AccountResponseDTO> {
        const accountCreated = await prisma.account.create({
            data: account
        })
        return accountCreated as any as AccountResponseDTO
    }

    async update(id: string, account: UpdateAccountBalanceDTO): Promise<AccountResponseDTO> {
        const {balance} = account
        const accountBalanceUpdated = await prisma.account.update({
            where: {id},
            data: {
                balance
            }
        })
        return accountBalanceUpdated as any as AccountResponseDTO
    }

    async findAll(): Promise<AccountResponseDTO[]> {
        const allAcounts = await prisma.account.findMany()
        return allAcounts as any as AccountResponseDTO[]
    }

    async findById(id: string): Promise<AccountResponseDTO> {
        const accountFound = await prisma.account.findUnique({
            where: {id}
        })
        return accountFound as any as AccountResponseDTO
    }

    async findByUser(id: string) {
        const accountFound = await prisma.account.findUnique({
            where: {userId: id}
        })
        return accountFound as any as AccountResponseDTO
    }

    async delete(id: string) {
        await prisma.account.delete({
            where: {id}
        })
    }
}