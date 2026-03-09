import { prisma } from "../../lib/prisma.js";
import type { Repository } from "../Repository.js";
import type { OperationEntity, CreateOperationDTO } from "../../model/Operation.js";
import type { DepositDTO, WithdrawDTO, TransferDTO } from "../../model/Operation.js";

export class OperationRepository implements Repository<CreateOperationDTO, any, OperationEntity> {

    async deposit(operationId: string ,accountId: string, data: DepositDTO): Promise<OperationEntity> {
        const [operation] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: accountId,
                    type: 'DEPOSIT',
                    amount: data.amount,
                    description: data.description ?? "Depósito realizado",
                    transactionId: operationId
                }
            }),
            prisma.account.update({
                where: { id: accountId },
                data: { balance: { increment: data.amount } }
            })
        ]);
        return operation as any as OperationEntity
    }

    async withdraw(operationId: string, accountId: string, data: WithdrawDTO): Promise<OperationEntity> {
        const [operation] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: accountId,
                    type: 'WITHDRAW',
                    amount: data.amount,
                    description: data.description ?? "Saque realizado",
                    transactionId: operationId
                }
            }),
            prisma.account.update({
                where: { id: accountId },
                data: { balance: { decrement: data.amount } }
            })
        ]);
        return operation as any as OperationEntity
    }

    async transfer(operationId: string, senderAccountId: string, data: TransferDTO): Promise<OperationEntity> {

        const [senderOp] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: senderAccountId,
                    type: 'TRANSFER_OUT',
                    amount: data.amount,
                    transactionId: operationId,
                    description: data.description ?? `Transferência para conta ${data.receiverAccountId}`
                }
            }),
            prisma.operation.create({
                data: {
                    accountId: data.receiverAccountId,
                    type: 'TRANSFER_IN',
                    amount: data.amount,
                    transactionId: operationId,
                    description: data.description ?? `Transferência recebida de ${senderAccountId}`
                }
            }),
            prisma.account.update({
                where: { id: senderAccountId },
                data: { balance: { decrement: data.amount } }
            }),
            prisma.account.update({
                where: { id: data.receiverAccountId },
                data: { balance: { increment: data.amount } }
            })
        ]);

        return senderOp as any as OperationEntity
    }

    async create(data: CreateOperationDTO) {
        const operationCreated = await prisma.operation.create({
            data 
        });
        return operationCreated as any as OperationEntity
    }

    async findById(id: string) {
        const operationFound = await prisma.operation.findUnique({
            where: { id } 
        })
        return operationFound as OperationEntity | null;
    }

    async findAll() {
        const allOperations = await prisma.operation.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return allOperations as any as OperationEntity[]
    }

    async update(id: string, data: any): Promise<OperationEntity> {
        throw new Error("Operações financeiras não podem ser editadas por segurança.");
    }

    async delete(id: string) {
        throw new Error("Operações financeiras não podem ser excluídas para manter o histórico.");
    }
}