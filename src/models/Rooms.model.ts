import mongoose from "mongoose";
const { Schema } = mongoose;
import { RoomInterface } from "../interfaces/Rooms";

const roomsSchema = new Schema<RoomInterface>({
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

export const Rooms = mongoose.model<RoomInterface>("Rooms", roomsSchema);
