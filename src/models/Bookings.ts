import bookingsData from "../data/Bookings.json";
import { BookingInterface } from "../interfaces/Bookings";

export const bookings = bookingsData as BookingInterface[];

async function getAllBookings() {
  //logica futura en DB.
  const data = await bookings;
  if (data.length === 0) throw new Error("No existen reservas.");
  return data;
}

async function getOneBooking(bookingId: number) {
  //logica futura en DB.
  const data = await bookings.filter(
    (booking) => booking.guest.id_reserva === bookingId.toString()
  );
  if (data.length === 0) throw new Error("No hay ninguna reserva con ese id.");
  return data;
}

async function postNewBooking(booking: BookingInterface) {
  //logica futura en DB.
  const initialLength = bookings.length;
  const data = await bookings.push(booking);
  if(data === initialLength) throw new Error("Tu reserva no se añadio correctamente.")
  return data;
}

async function updateBooking(
  bookingId: number,
  update: Partial<BookingInterface>
) {
  //logica futura en DB.
  const bookingIndex = await bookings.findIndex(
    (booking) => booking.guest.id_reserva === bookingId.toString()
  );

  if (bookingIndex === -1) throw new Error("No puedes modificar una reserva que no existe.")
  const data = [...bookings];
  Object.assign(data[bookingIndex], update);
  return data;

}

async function deleteBooking(bookingId: number) {
  //logica futura en DB.

  const bookingIndex = await bookings.findIndex(
    (booking) => booking.guest.id_reserva === bookingId.toString()
  );

  if (bookingIndex === -1) throw new Error("No hay ninguna reserva con ese id.");

  const data = bookings.splice(bookingIndex, 1);
  return data;
}

export const bookingService = {
  getAllBookings,
  getOneBooking,
  postNewBooking,
  updateBooking,
  delete: deleteBooking,
};
