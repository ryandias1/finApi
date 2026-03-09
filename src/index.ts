import { AccountController } from "./controller/AccountController.js"
import { OperationController } from "./controller/OperationController.js"
import { UserController } from "./controller/UserController.js"
import { AccountRepository } from "./repository/implementations/AccountRepository.js"
import { OperationRepository } from "./repository/implementations/OperationRepository.js"
import { UserRepository } from "./repository/implementations/UserRepository.js"
import { AccountService } from "./service/AccountService.js"
import { OperationService } from "./service/OperationService.js"
import { UserService } from "./service/UserService.js"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const accountRepository = new AccountRepository()
const accountService = new AccountService(accountRepository)
const accountController = new AccountController(accountService)

const operationRepository = new OperationRepository()
const operationService = new OperationService(operationRepository, userService, accountService)
const operationController = new OperationController(operationService)


export { userController, accountController, operationController }