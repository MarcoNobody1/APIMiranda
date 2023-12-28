"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const Bookings_model_1 = require("../models/Bookings.model");
async function getAllBookings() {
    const bookings = await Bookings_model_1.Bookings.find();
    if (bookings.length === 0)
        throw new Error("Error al obtener las reservas.");
    return bookings;
}
async function getOneBooking(bookingId) {
    const booking = await Bookings_model_1.Bookings.findById(bookingId);
    if (!booking)
        throw new Error("No hay ninguna reserva con ese id.");
    return booking;
}
async function getOneByRef(bookingRef) {
    const booking = await Bookings_model_1.Bookings.findOne({ reference_number: bookingRef });
    if (!booking)
        throw new Error("No hay ninguna reserva con ese numero de referencia.");
    return booking;
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
    getOneByRef,
    postNewBooking,
    updateBooking,
    delete: deleteBooking,
};
