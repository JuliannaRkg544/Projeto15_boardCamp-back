
import { rentSchema } from "../schemas/rentSchema.js";

export async function rentValidation(req,res,next){
    const rentInfo = req.body
    const validateRental = rentSchema.validate(rentInfo)
    if(validateRental.error){
        console.log("informações inválidas", validateRental.error.details)
        return res.sendStatus(400)
    }
   next()
   
}
