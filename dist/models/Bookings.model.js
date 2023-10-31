"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bookingsSchema = new Schema({
    guest: {
        nombre: { type: String, required: true },
        apellidos: { type: String, required: true },
        id_reserva: { type: String, required: true },
    },
    order_date: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    special_request: { type: String, required: true },
    room: {
        id: { type: String, required: true },
        room_type: { type: String, required: true },
        room_number: { type: String, required: true },
        price: { type: Number, required: true },
        amenities: { type: [String], required: true },
        room_description: { type: String, required: true },
    },
    status: { type: String, required: true },
});
exports.Bookings = mongoose_1.default.model("Bookings", bookingsSchema);
