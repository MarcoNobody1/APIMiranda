import { BookingInterface } from "../interfaces/Bookings";
import { QueryHandler } from "../util/connection";

async function getAllBookings() {
  const query = "SELECT * FROM booking";

  const bookings = await QueryHandler(query);

  return bookings;
}

async function getOneBooking(bookingId: string) {
  const query = "SELECT * FROM booking WHERE id = ?";

  const fields = [bookingId];

  const booking = await QueryHandler(query, fields);

  return booking;
}

async function postNewBooking(booking: BookingInterface) {
  const query =
    "INSERT INTO booking (nombre, apellido, order_date, check_in, check_out, special_request, room_id, price, status) VALUES (?,?,?,?,?,?,?,?,?)";

  const fields = [
    booking.nombre,
    booking.apellido,
    booking.order_date,
    booking.check_in,
    booking.check_out,
    booking.special_request,
    booking.room_id,
    booking.price,
    booking.status,
  ];

  const newBooking = await QueryHandler(query, fields);

  return newBooking;
}

async function updateBooking(
  bookingId: string,
  update: Partial<BookingInterface>
) {
  const query =
    "UPDATE booking SET nombre = ?, apellido = ?, order_date = ?, check_in = ?, check_out = ?, special_request = ?, room_id = ?, price = ?, status = ? WHERE id = ?";

  const fields = [
    update.nombre,
    update.apellido,
    update.order_date,
    update.check_in,
    update.check_out,
    update.special_request,
    update.room_id,
    update.price,
    update.status,
    bookingId,
  ];

  const updatedBooking = await QueryHandler(query, fields);

  return updatedBooking;
}

async function deleteBooking(bookingId: string) {
  const query = "DELETE FROM booking WHERE id = ?";

  const fields = [bookingId];

  const deletedBooking = await QueryHandler(query, fields);

  return deletedBooking;
}

export const bookingService = {
  getAllBookings,
  getOneBooking,
  postNewBooking,
  updateBooking,
  delete: deleteBooking,
};