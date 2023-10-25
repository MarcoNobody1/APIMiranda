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
exports.roomsController = void 0;
const express_1 = require("express");
const rooms_1 = require("../services/rooms");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.RoomService.getAllrooms();
        res.send(result);
    }
    catch (error) {
        res.status(500).send("Error al obtener las reservas.");
    }
}));
exports.roomsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.RoomService.getOneRoom(req.params.id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.roomsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.RoomService.delete(req.params.id);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.roomsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.RoomService.updateRoom(req.params.id, req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}));
exports.roomsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.RoomService.postNewRoom(req.body);
        res.status(200).send(`Your Room is number ${result}`);
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
