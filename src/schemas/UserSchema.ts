import Joi from 'joi';

export const UserSchema = Joi.object({
    photo: Joi.string().required(),
    username: Joi.string().required(),
    position: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    start_date: Joi.date().required(),
    job_description: Joi.string().required(),
    contact: Joi.string().required(),
    activity: Joi.string().required(),
  });
  