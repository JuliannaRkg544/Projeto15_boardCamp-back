import { Router } from "express";
import { addClient, listClient, listClientById, updateClient } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";

const clientRouter = Router()

clientRouter.post("/customers", clientValidation ,addClient)
clientRouter.get("/customers", listClient)
clientRouter.get("/customers/:id", listClientById)
clientRouter.put("/customers/:id",clientValidation ,updateClient)

export default clientRouter