import { BookingInterface } from "../interfaces/Bookings";
import { Bookings } from "../models/Bookings.model";
import { QueryHandler } from "../util/connection";

async function getAllBookings() {

  const query = 'SELECT * FROM booking';

  const result = await QueryHandler(query)

  return result;
}

async function getOneBooking(bookingId: string) {
  const query = 'SELECT * FROM booking WHERE id = ?';

  const fields = [bookingId];

  const result = await QueryHandler(query, fields);

  return result;
}

async function postNewBooking(booking: BookingInterface) {
  const newBooking = await Bookings.create(booking);
  if (!newBooking) throw new Error("Tu reserva no se añadio correctamente.");
  return newBooking;
}

async function updateBooking(
  bookingId: string,
  update: Partial<BookingInterface>
) {
  const updatedBooking = await Bookings.findByIdAndUpdate(bookingId, update, {
    new: true,
  });

  if (!updatedBooking) {
    throw new Error("No puedes modificar una reserva que no existe.");
  }

  return updatedBooking;
}

async function deleteBooking(bookingId: string) {
  const deletedBooking = await Bookings.findByIdAndDelete(bookingId);

  if (!deletedBooking) {
    throw new Error("No hay ninguna reserva con ese id.");
  }

  return deletedBooking;
}

export const bookingService = {
  getAllBookings,
  getOneBooking,
  postNewBooking,
  updateBooking,
  delete: deleteBooking,
};
