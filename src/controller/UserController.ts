import type { Request, Response } from "express";
import type { UserService } from "../service/UserService.js";
import { CreateUserDtoSchema, LoginUserDtoSchema } from "../model/User.js";
import { da } from "zod/locales";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async register(req: Request, res: Response) {
        const data = CreateUserDtoSchema.parse(req.body)
        const userCreated = await this.userService.signUpUser(data)
        res.status(201).json(userCreated)
    }

    async login (req: Request, res: Response) {
        const data = LoginUserDtoSchema.parse(req.body)
        const token = await this.userService.signInUser(data)
        res.status(200).json({token})
    }
}