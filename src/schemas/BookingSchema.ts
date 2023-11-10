import Joi from 'joi';

export const BookingSchema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    order_date: Joi.date().required(),
    check_in: Joi.date().required(),
    check_out: Joi.date().required(),
    special_request: Joi.string().required(),
    room_id: Joi.number().required(),
    price: Joi.string().required(),
    status: Joi.string().required(),
});
