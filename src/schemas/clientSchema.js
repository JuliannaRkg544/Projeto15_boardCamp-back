import joi from "joi"

const cpfRegex = /^[0-9]{11}$/
const phoneRegex = /^[0-9]{10,11}$/
const birthdayRegex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/
export const clientSchema = joi.object({
    name: joi.string().required().min(3),
    phone: joi.string().required().pattern(phoneRegex),
    cpf: joi.string().pattern(cpfRegex).required(),
    birthday: joi.string().required().pattern(birthdayRegex),

})