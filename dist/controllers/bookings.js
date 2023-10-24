"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const Bookings_json_1 = __importDefault(require("../data/Bookings.json"));
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get("/", (req, res) => {
    res.send(Bookings_json_1.default);
});
exports.bookingsController.get("/:id", (req, res) => {
    const id = req.params.id.toString();
    const result = Bookings_json_1.default.filter((booking) => booking.guest.id_reserva === id);
    res.send(result);
});
exports.bookingsController.delete("/:id", (req, res) => {
    const id = req.params.id.toString();
    const indexBooking = Bookings_json_1.default.findIndex((booking) => booking.guest.id_reserva === id);
    Bookings_json_1.default.splice(indexBooking, 1);
    res.status(200).send(`Booking ${id} deleted`);
});
exports.bookingsController.put("/:id", (req, res) => {
    const id = req.params.id.toString();
    const selectedBooking = req.body.data;
    const bookingIndex = Bookings_json_1.default.findIndex((booking) => booking.guest.id_reserva === id);
    const modifiedBooking = (Bookings_json_1.default[bookingIndex] = Object.assign(Object.assign({}, Bookings_json_1.default[bookingIndex]), selectedBooking));
    res.send(modifiedBooking);
});
exports.bookingsController.post("/", (req, res) => {
    const newBooking = req.body;
    Bookings_json_1.default.push(newBooking);
    res.status(200).send(`Booking ${newBooking.guest.id_reserva} added`);
});
