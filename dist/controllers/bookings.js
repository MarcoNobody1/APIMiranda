"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const bookings_1 = require("../services/bookings");
const validation_1 = require("../middleware/validation");
const BookingSchema_1 = require("../models/BookingSchema");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get("/", async (_req, res) => {
    try {
        const bookings = await bookings_1.bookingService.getAllBookings();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
exports.bookingsController.get("/:id", async (req, res) => {
    try {
        const booking = await bookings_1.bookingService.getOneBooking(req.params.id);
        res.json(booking);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.bookingsController.delete("/:id", async (req, res) => {
    try {
        const deleted = await bookings_1.bookingService.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.bookingsController.put("/:id", (0, validation_1.genValidationMiddleware)(BookingSchema_1.BookingSchema), async (req, res) => {
    try {
        const updated = await bookings_1.bookingService.updateBooking(req.params.id, req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.bookingsController.post("/", (0, validation_1.genValidationMiddleware)(BookingSchema_1.BookingSchema), async (req, res) => {
    try {
        const added = await bookings_1.bookingService.postNewBooking(req.body);
        res.json(added);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
