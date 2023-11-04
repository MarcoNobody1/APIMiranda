"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsController = void 0;
const express_1 = require("express");
const rooms_1 = require("../services/rooms");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get("/", async (_req, res) => {
    try {
        const rooms = await rooms_1.roomService.getAllRooms();
        res.json(rooms);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
exports.roomsController.get("/:id", async (req, res) => {
    try {
        const room = await rooms_1.roomService.getOneRoom(req.params.id);
        res.json(room);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.roomsController.delete("/:id", async (req, res) => {
    try {
        const deleted = await rooms_1.roomService.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.roomsController.put("/:id", async (req, res) => {
    try {
        const updated = await rooms_1.roomService.updateRoom(req.params.id, req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.roomsController.post("/", async (req, res) => {
    try {
        const added = await rooms_1.roomService.postNewRoom(req.body);
        res.json(added);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
