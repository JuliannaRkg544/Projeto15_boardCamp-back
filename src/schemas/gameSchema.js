import joi from "joi"

// {
//     name: 'Banco Imobiliário',
//     image: 'http://',
//     stockTotal: 3,
//     categoryId: 1,
//     pricePerDay: 1500,
//   }

export const gameSchema = joi.object({
    name : joi.string().min(3).required(),
    image: joi.string().uri(),
    stockTotal: joi.number().integer().min(1),
    categoryId: joi.number().integer(),
    pricePerDay: joi.number().integer().min(1),
})