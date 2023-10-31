import mongoose from "mongoose";
const { Schema } = mongoose;
import { BookingInterface } from "../interfaces/Bookings";

const bookingsSchema = new Schema<BookingInterface>({
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

export const Bookings = mongoose.model<BookingInterface>(
  "Bookings",
  bookingsSchema
);
