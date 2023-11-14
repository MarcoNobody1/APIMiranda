"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bookingsSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    order_date: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    special_request: { type: String, required: true },
    room_id: { type: String, required: true },
    room_photos: { type: [String], required: true },
    room_type: { type: String, required: true },
    room_number: { type: String, required: true },
    room_amenities: { type: [String], required: true },
    room_description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
});
exports.Bookings = mongoose_1.default.model("Bookings", bookingsSchema);
