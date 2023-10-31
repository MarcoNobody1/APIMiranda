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
const rooms_1 = require("../models/rooms");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.roomService.getAllrooms();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: true, message: "Error al obtener las reservas." });
    }
}));
exports.roomsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.roomService.getOneRoom(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.roomsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.roomService.delete(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.roomsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.roomService.updateRoom(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.roomsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rooms_1.roomService.postNewRoom(req.body);
        res.status(200).json(`Your Room is number ${result}`);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
