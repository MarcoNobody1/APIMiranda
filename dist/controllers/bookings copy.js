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
        const result = yield bookings_1.bookingService.getAllBookings();
        res.send(result);
    }
    catch (error) {
        res.status(500).send("Error al obtener las reservas.");
    }
}));
exports.bookingsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_1.bookingService.getOneBooking(parseInt(req.params.id));
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.bookingsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_1.bookingService.delete(parseInt(req.params.id));
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.bookingsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_1.bookingService.updateBooking(parseInt(req.params.id), req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.bookingsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_1.bookingService.postNewBooking(req.body);
        res.status(200).send(`Your booking is number ${result}`);
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
