import { BookingInterface } from "../interfaces/Bookings";
import { Bookings } from "../models/Bookings.model";

async function getAllBookings() {
  const bookings = await Bookings.find();
  if (bookings.length === 0) throw new Error("Error al obtener las reservas.");
  return bookings;
}

async function getOneBooking(bookingId: string) {
  const booking = await Bookings.findById(bookingId);
  if (!booking) throw new Error("No hay ninguna reserva con ese id.");
  return booking;
}

async function getOneByRef(bookingRef: string) {
  const booking = await Bookings.findOne({reference_number: bookingRef});
  if (!booking) throw new Error("No hay ninguna reserva con ese numero de referencia.");
  return booking;
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
  getOneByRef,
  postNewBooking,
  updateBooking,
  delete: deleteBooking,
};
