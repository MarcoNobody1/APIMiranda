import mongoose from "mongoose";
const { Schema } = mongoose;
import { BookingInterface } from "../interfaces/Bookings";

const bookingsSchema = new Schema<BookingInterface>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  order_date: { type: String, required: true },
  check_in: { type: String, required: true },
  check_out: { type: String, required: true },
  special_request: { type: String, required: true },
  room_id: { type: String, required: true },
  room_photos: {type: [String], required: true},
  room_type: { type: String, required: true },
  room_number: { type: String, required: true },
  room_amenities: { type: [String], required: true },
  room_description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

export const Bookings = mongoose.model<BookingInterface>(
  "Bookings",
  bookingsSchema
);
