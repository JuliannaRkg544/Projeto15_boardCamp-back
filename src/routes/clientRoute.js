import { Router } from "express";
import { addClient } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";

const clientRouter = Router()

clientRouter.post("/customers", clientValidation ,addClient)
// clientRouter.get("/customers", listClient)
// clientRouter.put("/customers", updateClient)

export default clientRouter