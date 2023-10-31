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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = exports.bookings = void 0;
const Bookings_json_1 = __importDefault(require("../data/Bookings.json"));
exports.bookings = Bookings_json_1.default;
function getAllBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.bookings;
        if (data.length === 0)
            throw new Error("No existen reservas.");
        return data;
    });
}
function getOneBooking(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.bookings.filter((booking) => booking.guest.id_reserva === bookingId.toString());
        if (data.length === 0)
            throw new Error("No hay ninguna reserva con ese id.");
        return data;
    });
}
function postNewBooking(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const initialLength = exports.bookings.length;
        const data = yield exports.bookings.push(booking);
        if (data === initialLength)
            throw new Error("Tu reserva no se añadio correctamente.");
        return data;
    });
}
function updateBooking(bookingId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const bookingIndex = yield exports.bookings.findIndex((booking) => booking.guest.id_reserva === bookingId.toString());
        if (bookingIndex === -1)
            throw new Error("No puedes modificar una reserva que no existe.");
        const data = [...exports.bookings];
        Object.assign(data[bookingIndex], update);
        return data;
    });
}
function deleteBooking(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const bookingIndex = yield exports.bookings.findIndex((booking) => booking.guest.id_reserva === bookingId.toString());
        if (bookingIndex === -1)
            throw new Error("No hay ninguna reserva con ese id.");
        const data = exports.bookings.splice(bookingIndex, 1);
        return data;
    });
}
exports.bookingService = {
    getAllBookings,
    getOneBooking,
    postNewBooking,
    updateBooking,
    delete: deleteBooking,
};
