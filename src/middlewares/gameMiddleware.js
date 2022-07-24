import { gameSchema } from "../schemas/gameSchema.js";

export function gameValidation(req, res, next){
    const game = req.body
    const validateGame = gameSchema.validate(game);
    if(validateGame.error){
        console.log("erro to validate game", validateGame.error.details)
        return res.sendStatus(400)
    }
    next()
}