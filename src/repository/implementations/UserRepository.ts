import type { Repository } from "../Repository.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateUserDTO, UpdateUserDTO, UserEntity, UserWithAccountDTO } from "../../model/User.js";
import type { User } from "../../generated/prisma/browser.js";

export class UserRepository implements Repository<CreateUserDTO, UpdateUserDTO, UserWithAccountDTO> {
    async create(user: CreateUserDTO) {
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
        return userCreated
    }

    async update(id: string, user: UpdateUserDTO) {
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
        return userUpdated
    }

    async findAll() {
        const allUsers = await prisma.user.findMany({
            include: {
                account: true
            }
        });
        return allUsers;
    }

    async findById(id: string) {
        const userFound = await prisma.user.findUnique({
            where: {id},
            include: {
                account: true
            }
        })
        return userFound
    }

    async findByEmail(email: string) {
        const userFound: User = await prisma.user.findUnique({
            where: {email}
        })
        return userFound as UserEntity | null
    }

    async delete(id: string) {
        await prisma.user.delete({
            where: {id}
        })
    }
}