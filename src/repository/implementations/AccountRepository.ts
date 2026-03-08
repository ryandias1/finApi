import { prisma } from "../../lib/prisma.js";
import type { AccountResponseDTO, CreateAccountDTO, UpdateAccountBalanceDTO } from "../../model/Account.js";
import type { Repository } from "../Repository.js";

export class AccountRepository implements Repository<CreateAccountDTO, UpdateAccountBalanceDTO, AccountResponseDTO> {
    async create(account: CreateAccountDTO) {
        const accountCreated = await prisma.account.create({
            data: account
        })
        return accountCreated
    }

    async update(id: string, account: UpdateAccountBalanceDTO) {
        const {balance} = account
        const accountBalanceUpdated = await prisma.account.update({
            where: {id},
            data: {
                balance
            }
        })
        return accountBalanceUpdated
    }

    async findAll() {
        const allAcounts = await prisma.account.findMany()
        return allAcounts
    }

    async findById(id: string) {
        const accountFound = await prisma.account.findUnique({
            where: {id}
        })
        return accountFound
    }

    async delete(id: string) {
        await prisma.account.delete({
            where: {id}
        })
    }
}