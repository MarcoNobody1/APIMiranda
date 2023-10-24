import { bookingsController } from "../controllers/bookings";
import bookingsData from "../data/Bookings.json";
import { BookingInterface } from "../models/Bookings";

export const bookings = bookingsData as BookingInterface[];

async function get() {
  // Get all bookings from json file
}

async function getById(bookingId: number) {
  // Get a booking by id from json file
}

async function post(booking: BookingInterface) {
  // Save a booking to json file
}

async function put(bookingId: number, update: Partial<BookingInterface>) {
  // Update a booking by id and save to json file
}

async function _delete(bookingId: number) {
  // Delete a booking by id from json file
}

export const bookingService = {
  get,
  getById,
  post,
  put,
  delete: _delete,
};