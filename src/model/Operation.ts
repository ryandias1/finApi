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
    relatedAccountId: z.uuid().nullable(),
    createdAt: z.date(),
});

export const CreateOperationDtoSchema = OperationEntitySchema.omit({
    id: true,
    createdAt: true,
});

export const DepositDtoSchema = z.object({
  accountId: z.string().uuid(),
  amount: z.coerce.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
});

export const WithdrawDtoSchema = DepositDtoSchema;

export const TransferDtoSchema = z.object({
  senderAccountId: z.uuid(),
  receiverAccountId: z.uuid(),
  amount: z.coerce.number().positive(),
  description: z.string().optional(),
}).refine(data => data.senderAccountId !== data.receiverAccountId, {
  message: "Contas de origem e destino devem ser diferentes",
  path: ["receiverAccountId"]
});

export type OperationEntity = z.infer<typeof OperationEntitySchema>;
export type CreateOperationDTO = z.infer<typeof CreateOperationDtoSchema>
export type DepositDTO = z.infer<typeof DepositDtoSchema>;
export type WithdrawDTO = z.infer<typeof WithdrawDtoSchema>;
export type TransferDTO = z.infer<typeof TransferDtoSchema>;