import { z } from 'zod';

export const AccountEntitySchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    balance: z.coerce.number(),
    createdAt: z.date(),
});

export const CreateAccountDtoSchema = AccountEntitySchema.pick({
    id: true
});

export const AccountResponseDtoSchema = AccountEntitySchema;

export type AccountEntity = z.infer<typeof AccountEntitySchema>;
export type AccountResponseDTO = z.infer<typeof AccountResponseDtoSchema>;