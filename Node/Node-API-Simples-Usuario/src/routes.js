import { Router } from "express";  // Importando só o Router da biblioteca do express
import { getUsers, createUser, deleteUser } from "./controllers/UserController.js"


const routes = Router()

routes.get("/users", getUsers)
routes.post("/users", createUser)
routes.delete("/users/:id", deleteUser)


export default routes