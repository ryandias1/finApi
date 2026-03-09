import { UserResponseDtoSchema, type CreateUserDTO, type LoginUserDTO, type UserResponseDTO } from "../model/User.js";
import type { UserRepository } from "../repository/implementations/UserRepository.js";
import { hash, compare } from "bcrypt";
import "dotenv/config"
import { generateToken } from "../utils/TokenService.js";
import { AppError } from "../errors/AppError.js";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async signUpUser(user: CreateUserDTO) {
        const { password } = user
        const hashPassword = await hash(password, 12);
        user.password = hashPassword;
        const userCreated = await this.userRepository.create(user)
        return UserResponseDtoSchema.parse(userCreated)
    }

    async signInUser(user: LoginUserDTO) {
        const { email, password } = user
        const userExists = await this.userRepository.findByEmail(email)
        if (!userExists) {
            throw new AppError("Email ou senha incorretos", 401)
        }
        const passwordCorrect = await compare(password, userExists.password);
        if (!passwordCorrect) {
            throw new AppError("Email ou senha incorretos", 401)
        }
        const token = generateToken(userExists.id)
        return token
    }
}