import { clientSchema } from "../schemas/clientSchema.js";

export function clientValidation(req, res, next){
    const client = req.body
    const validateClient = clientSchema.validate(client)
    if(validateClient.error){
        console.log("error to validate client", validateClient.error.details)
        return res.sendStatus(400)
    }
    next()
}