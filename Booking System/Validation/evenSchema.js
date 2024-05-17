import Joi from "joi";

const create = Joi.object({
    name: Joi.string().required(),
    type:Joi.string().required(),
    price:Joi.number().required(), 
    description:Joi.string().required(),
    venue : Joi.string().required(),
    date:Joi.string().required(),
    total_tickets: Joi.number().required(), 
    status : Joi.number().required()
})

const View = Joi.object({
    id:Joi.string().required()
})

export default  {
    create,
    View
}