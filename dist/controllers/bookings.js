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
exports.bookingsController = void 0;
const express_1 = require("express");
const bookings_1 = require("../services/bookings");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookings_1.bookingService.getAllBookings();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.bookingsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookings_1.bookingService.getOneBooking(req.params.id);
        res.json(booking);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.bookingsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield bookings_1.bookingService.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.bookingsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield bookings_1.bookingService.updateBooking(req.params.id, req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.bookingsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const added = yield bookings_1.bookingService.postNewBooking(req.body);
        res.json(added);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
