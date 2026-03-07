import { z } from 'zod';
import { OperationEntitySchema } from './Operation.js';

export const AccountEntitySchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    balance: z.coerce.number(),
    createdAt: z.date(),
});

export const CreateAccountDtoSchema = AccountEntitySchema.pick({
    userId: true
});

export const AccountResponseDtoSchema = AccountEntitySchema;

export const AccountWithOperationsSchema = AccountResponseDtoSchema.extend({
  operations: z.array(OperationEntitySchema) 
});

export type AccountEntity = z.infer<typeof AccountEntitySchema>;
export type AccountResponseDTO = z.infer<typeof AccountResponseDtoSchema>;