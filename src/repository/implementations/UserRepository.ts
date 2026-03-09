import type { Repository } from "../Repository.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateUserDTO, UpdateUserDTO, UserEntity, UserWithAccountDTO } from "../../model/User.js";
import type { User } from "../../generated/prisma/browser.js";

export class UserRepository implements Repository<CreateUserDTO, UpdateUserDTO, UserWithAccountDTO> {
    async create(user: CreateUserDTO): Promise<UserWithAccountDTO> {
        const {name, email, document, password} = user
        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                document,
                password,
                account: {
                    create: {
                        balance: 0
                    }
                }
            }, include: {
                account: true
            }
        })
        return userCreated as any as UserWithAccountDTO
    }

    async update(id: string, user: UpdateUserDTO): Promise<UserWithAccountDTO> {
        const {name, email, document, password} = user;
        const userUpdated = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                document,
                password
            }, include: {
                account: true
            }
        })
        return userUpdated as any as UserWithAccountDTO
    }

    async findAll(): Promise<UserWithAccountDTO[]> {
        const allUsers = await prisma.user.findMany({
            include: {
                account: true
            }
        });
        return allUsers as any as UserWithAccountDTO[]
    }

    async findById(id: string): Promise<UserWithAccountDTO> {
        const userFound = await prisma.user.findUnique({
            where: {id},
            include: {
                account: true
            }
        })
        return userFound as any as UserWithAccountDTO
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const userFound = await prisma.user.findUnique({
            where: {email}
        })
        return userFound as UserEntity
    }

    async delete(id: string) {
        await prisma.user.delete({
            where: {id}
        })
    }
}