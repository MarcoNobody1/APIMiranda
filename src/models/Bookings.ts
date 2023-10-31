import mongoose from "mongoose";
const { Schema } = mongoose;
import { BookingInterface } from "../interfaces/Bookings";


const bookingsSchema = new Schema<BookingInterface>({
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

export const Bookings = mongoose.model("Bookings", bookingsSchema);
