import { z } from 'zod';

export const UserEntitySchema = z.object({
  id: z.uuid(),
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.email("E-mail inválido"),
  document: z.string(),
  password: z.string(),
  createdAt: z.date()
});

export const CreateUserDtoSchema = UserEntitySchema.omit({
    id: true,
    createdAt: true
}).extend({
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")
})

export const UpdateUserDtoSchema = CreateUserDtoSchema.partial()

export const UserResponseDtoSchema = UserEntitySchema.omit({
    password: true
})

export type UserEntity = z.infer<typeof UserEntitySchema>;
export type CreateUserDTO = z.infer<typeof CreateUserDtoSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserDtoSchema>;
export type UserResponseDTO = z.infer<typeof UserResponseDtoSchema>;