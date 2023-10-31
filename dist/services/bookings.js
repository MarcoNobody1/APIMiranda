"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const Bookings_model_1 = require("../models/Bookings.model");
function getAllBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookings = yield Bookings_model_1.Bookings.find();
        if (bookings.length === 0)
            throw new Error("Error al obtener las reservas.");
        return bookings;
    });
}
function getOneBooking(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield Bookings_model_1.Bookings.findById(bookingId);
        if (!booking)
            throw new Error("No hay ninguna reserva con ese id.");
        return booking;
    });
}
function postNewBooking(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBooking = yield Bookings_model_1.Bookings.create(booking);
        if (!newBooking)
            throw new Error("Tu reserva no se añadio correctamente.");
        return newBooking;
    });
}
function updateBooking(bookingId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedBooking = yield Bookings_model_1.Bookings.findByIdAndUpdate(bookingId, update, {
            new: true,
        });
        if (!updatedBooking) {
            throw new Error("No puedes modificar una reserva que no existe.");
        }
        return updatedBooking;
    });
}
function deleteBooking(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedBooking = yield Bookings_model_1.Bookings.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error("No hay ninguna reserva con ese id.");
        }
        return deletedBooking;
    });
}
exports.bookingService = {
    getAllBookings,
    getOneBooking,
    postNewBooking,
    updateBooking,
    delete: deleteBooking,
};
