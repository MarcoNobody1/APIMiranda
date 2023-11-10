import Joi from "joi";

export const RoomSchema = Joi.object({
  number: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().required(),
  availability: Joi.string().required(),
});
