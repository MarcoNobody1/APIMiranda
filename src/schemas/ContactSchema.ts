import Joi from "joi";

export const ContactSchema = Joi.object({
  date: Joi.date().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subject: Joi.string().required(),
  comment: Joi.string().required(),
  archived: Joi.boolean().required(),
});
