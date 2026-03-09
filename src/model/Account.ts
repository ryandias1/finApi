import { z } from 'zod';
import { OperationEntitySchema } from './Operation.js';

export const AccountEntitySchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    balance: z.coerce.number(),
    createdAt: z.date(),
});

export const CreateAccountDtoSchema = AccountEntitySchema.pick({
    userId: true,
    balance: true
});

export const UpdateAccountBalanceDtoSchema = AccountEntitySchema.pick({
    balance: true
});

export type UpdateAccountBalanceDTO = z.infer<typeof UpdateAccountBalanceDtoSchema>;

export const AccountResponseDtoSchema = AccountEntitySchema;

export const AccountWithOperationsSchema = AccountResponseDtoSchema.extend({
  operations: z.array(OperationEntitySchema) 
});

export type AccountEntity = z.infer<typeof AccountEntitySchema>;
export type CreateAccountDTO = z.infer<typeof CreateAccountDtoSchema>;
export type UpdateAccountDTO = z.infer<typeof UpdateAccountBalanceDtoSchema>
export type AccountResponseDTO = z.infer<typeof AccountResponseDtoSchema>;
export type accountWithOperationsDTO = z.infer<typeof AccountWithOperationsSchema>