"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const connection_1 = require("../util/connection");
async function getAllBookings() {
    const query = "SELECT * FROM booking";
    const bookings = await (0, connection_1.QueryHandler)(query);
    return bookings;
}
async function getOneBooking(bookingId) {
    const query = "SELECT * FROM booking WHERE id = ?";
    const fields = [bookingId];
    const booking = await (0, connection_1.QueryHandler)(query, fields);
    return booking;
}
async function postNewBooking(booking) {
    const query = "INSERT INTO booking (nombre, apellido, order_date, check_in, check_out, special_request, room_id, price, status) VALUES (?,?,?,?,?,?,?,?,?)";
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
    const newBooking = await (0, connection_1.QueryHandler)(query, fields);
    return newBooking;
}
async function updateBooking(bookingId, update) {
    const query = "UPDATE booking SET(nombre = ?, apellido = ?, order_date = ?, check_in = ?, check_out = ?, special_request = ?, room_id = ?, price = ?, status = ?) WHERE id = ?";
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
    const updatedBooking = await (0, connection_1.QueryHandler)(query, fields);
    return updatedBooking;
}
async function deleteBooking(bookingId) {
    const query = "DELETE booking WHERE id = ?";
    const fields = [bookingId];
    const deletedBooking = await (0, connection_1.QueryHandler)(query, fields);
    return deletedBooking;
}
exports.bookingService = {
    getAllBookings,
    getOneBooking,
    postNewBooking,
    updateBooking,
    delete: deleteBooking,
};
