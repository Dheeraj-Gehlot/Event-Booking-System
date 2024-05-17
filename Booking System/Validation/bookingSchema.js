import Joi from "joi";

const create = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile:Joi.number().required(),
    address : Joi.string().required(),
    tickits :Joi.number().required(),
    event_id: Joi.string().required(),
})

export {
    create
}