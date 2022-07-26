import { categorySchema } from "../schemas/catgoriesSchema.js";

export function categorieValidation(req, res, next ){
    const {name} = req.body
    const validateNameCategory = categorySchema.validate({name})
    if(validateNameCategory.error){
        console.log("invalid category name", validateNameCategory.error.details )
        return res.status(422).send("invalid category name")
    }
    next()
}
