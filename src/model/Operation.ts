import { z } from 'zod';

// Enum de Operações
export const OperationTypeEnum = z.enum(['DEPOSIT', 'WITHDRAW', 'TRANSFER_IN', 'TRANSFER_OUT']);

export const OperationEntitySchema = z.object({
    id: z.uuid(),
    accountId: z.uuid(),
    type: OperationTypeEnum,
    amount: z.coerce.number().positive("O valor deve ser positivo"),
    description: z.string().nullable(),
    transactionId: z.string().nullable(),
    createdAt: z.date(),
});

export const CreateOperationDtoSchema = OperationEntitySchema.omit({
    id: true,
    createdAt: true,
});

export type OperationEntity = z.infer<typeof OperationEntitySchema>;