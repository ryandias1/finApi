import express from "express"
import "dotenv/config"
import { userRoutes } from "./routes/UserRoutes.js"
import { accountRoutes } from "./routes/AccountRoutes.js"
import { operationRoutes } from "./routes/OperationRoutes.js"
import { errorMiddleware } from "./middleware/ErrorMiddleware.js"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use("/users", userRoutes)
app.use("/statement", accountRoutes)
app.use("/operation", operationRoutes)
app.use(errorMiddleware)
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))