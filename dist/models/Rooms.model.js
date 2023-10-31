"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const roomsSchema = new Schema({
    room_name: {
        id: { type: String, required: true },
        room_photo: { type: String, required: true },
        room_number: { type: Number, required: true },
        room_description: { type: String, required: true },
    },
    room_type: { type: String, required: true },
    amenities: { type: [String], required: true },
    price: { type: Number, required: true },
    offer_price: {
        isOffer: { type: Boolean, required: true },
        discount: { type: Number, required: true },
    },
    availability: { type: String, required: true },
});
exports.Rooms = mongoose_1.default.model("Rooms", roomsSchema);
