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
        nombre: String,
        apellidos: String,
        id_reserva: String,
    },
    order_date: String,
    check_in: String,
    check_out: String,
    special_request: String,
    room: {
        id: String,
        room_type: String,
        room_number: String,
        price: Number,
        amenities: [String],
        room_description: String,
    },
    status: String,
});
exports.Bookings = mongoose_1.default.model("Bookings", bookingsSchema);
