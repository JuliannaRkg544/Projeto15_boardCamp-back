import { Router } from "express";
import { createGame, listGame } from "../controllers/gamesController.js";
import { gameValidation } from "../middlewares/gameMiddleware.js";

const gameRouter = Router()

gameRouter.post("/games", gameValidation,createGame)
gameRouter.get("/games", listGame)

export default gameRouter