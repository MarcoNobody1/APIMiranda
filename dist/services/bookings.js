"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const Bookings_model_1 = require("../models/Bookings.model");
const connection_1 = require("../util/connection");
async function getAllBookings() {
    const query = 'SELECT * FROM booking';
    const result = await (0, connection_1.QueryHandler)(query);
    return result;
}
async function getOneBooking(bookingId) {
    const query = 'SELECT * FROM booking WHERE id = ?';
    const fields = [bookingId];
    const result = await (0, connection_1.QueryHandler)(query, fields);
    return result;
}
async function postNewBooking(booking) {
    const newBooking = await Bookings_model_1.Bookings.create(booking);
    if (!newBooking)
        throw new Error("Tu reserva no se añadio correctamente.");
    return newBooking;
}
async function updateBooking(bookingId, update) {
    const updatedBooking = await Bookings_model_1.Bookings.findByIdAndUpdate(bookingId, update, {
        new: true,
    });
    if (!updatedBooking) {
        throw new Error("No puedes modificar una reserva que no existe.");
    }
    return updatedBooking;
}
async function deleteBooking(bookingId) {
    const deletedBooking = await Bookings_model_1.Bookings.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
        throw new Error("No hay ninguna reserva con ese id.");
    }
    return deletedBooking;
}
exports.bookingService = {
    getAllBookings,
    getOneBooking,
    postNewBooking,
    updateBooking,
    delete: deleteBooking,
};
