import { UserController } from "./controller/UserController.js"
import { UserRepository } from "./repository/implementations/UserRepository.js"
import { UserService } from "./service/UserService.js"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export { userController }