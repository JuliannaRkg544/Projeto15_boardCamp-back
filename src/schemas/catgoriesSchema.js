import joi from "joi"

//criar schema de validaçaõ 

export const categorieNameValidation = joi.object({
    name: joi.string().required().min(3)
})