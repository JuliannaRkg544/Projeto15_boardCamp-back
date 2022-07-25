import { Router } from "express";
import { rentValidation } from "../middlewares/rentMiddleware.js";
import { insertRental, listRental, finishRental, deleteRental } from "../controllers/rentController.js";

const rentRouter = Router()

rentRouter.post("/rentals",rentValidation, insertRental)
rentRouter.post("/rentals/:id/return", finishRental)
rentRouter.get("/rentals", listRental)
rentRouter.delete("/rentals/:id", deleteRental)

export default rentRouter