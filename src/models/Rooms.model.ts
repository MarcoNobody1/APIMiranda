import mongoose from "mongoose";
const { Schema } = mongoose;
import { RoomInterface } from "../interfaces/Rooms";

const roomsSchema = new Schema<RoomInterface>({
  photos: { type: [String], required: true },
  number: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  amenities: { type: [String], required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  availability: { type: String, required: true },
});

export const Rooms = mongoose.model<RoomInterface>("Rooms", roomsSchema);
