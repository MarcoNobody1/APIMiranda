"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.BookingSchema = joi_1.default.object({
    nombre: joi_1.default.string().required(),
    apellido: joi_1.default.string().required(),
    order_date: joi_1.default.date().required(),
    check_in: joi_1.default.date().required(),
    check_out: joi_1.default.date().required(),
    special_request: joi_1.default.string().required(),
    room_id: joi_1.default.number().required(),
    price: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
