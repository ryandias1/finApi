import { prisma } from "../../lib/prisma.js";
import type { Repository } from "../Repository.js";
import type { OperationEntity, CreateOperationDTO } from "../../model/Operation.js";
import type { DepositDTO, WithdrawDTO, TransferDTO } from "../../model/Operation.js";

export class OperationRepository implements Repository<CreateOperationDTO, any, OperationEntity> {

    async deposit(data: DepositDTO): Promise<OperationEntity> {
        const [operation] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: data.accountId,
                    type: 'DEPOSIT',
                    amount: data.amount,
                    description: data.description ?? "Depósito realizado"
                }
            }),
            prisma.account.update({
                where: { id: data.accountId },
                data: { balance: { increment: data.amount } }
            })
        ]);
        return operation as OperationEntity;
    }

    async withdraw(data: WithdrawDTO): Promise<OperationEntity> {
        const [operation] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: data.accountId,
                    type: 'WITHDRAW',
                    amount: data.amount,
                    description: data.description ?? "Saque realizado"
                }
            }),
            prisma.account.update({
                where: { id: data.accountId },
                data: { balance: { decrement: data.amount } }
            })
        ]);
        return operation as OperationEntity;
    }

    async transfer(data: TransferDTO): Promise<OperationEntity> {
        const transactionId = crypto.randomUUID();

        const [senderOp] = await prisma.$transaction([
            prisma.operation.create({
                data: {
                    accountId: data.senderAccountId,
                    type: 'TRANSFER_OUT',
                    amount: data.amount,
                    transactionId,
                    description: data.description ?? `Transferência para conta ${data.receiverAccountId}`
                }
            }),
            prisma.operation.create({
                data: {
                    accountId: data.receiverAccountId,
                    type: 'TRANSFER_IN',
                    amount: data.amount,
                    transactionId,
                    description: data.description ?? `Transferência recebida de ${data.senderAccountId}`
                }
            }),
            prisma.account.update({
                where: { id: data.senderAccountId },
                data: { balance: { decrement: data.amount } }
            }),
            prisma.account.update({
                where: { id: data.receiverAccountId },
                data: { balance: { increment: data.amount } }
            })
        ]);

        return senderOp as OperationEntity;
    }

    async create(data: CreateOperationDTO) {
        const operationCreated = await prisma.operation.create({
            data 
        });
        return operationCreated as OperationEntity;
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
        return allOperations;
    }

    async update(id: string, data: any): Promise<OperationEntity> {
        throw new Error("Operações financeiras não podem ser editadas por segurança.");
    }

    async delete(id: string) {
        throw new Error("Operações financeiras não podem ser excluídas para manter o histórico.");
    }
}