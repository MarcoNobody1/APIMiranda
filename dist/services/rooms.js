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
exports.roomService = void 0;
const Rooms_model_1 = require("../models/Rooms.model");
function getAllRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield Rooms_model_1.Rooms.find();
        if (rooms.length === 0)
            throw new Error("Error al obtener las habitaciones.");
        return rooms;
    });
}
function getOneRoom(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield Rooms_model_1.Rooms.findById(roomId);
        if (!room)
            throw new Error("No hay ninguna habitacion con ese id.");
        return room;
    });
}
function postNewRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRoom = yield Rooms_model_1.Rooms.create(room);
        if (!newRoom)
            throw new Error("Tu habitacion no se añadio correctamente.");
        return newRoom;
    });
}
function updateRoom(roomId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedRoom = yield Rooms_model_1.Rooms.findByIdAndUpdate(roomId, update, {
            new: true,
        });
        if (!updatedRoom) {
            throw new Error("No puedes modificar una habitacion que no existe.");
        }
        return updatedRoom;
    });
}
function deleteRoom(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedRoom = yield Rooms_model_1.Rooms.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            throw new Error("No hay ninguna habitacion con ese id.");
        }
        return deletedRoom;
    });
}
exports.roomService = {
    getAllRooms,
    getOneRoom,
    postNewRoom,
    updateRoom,
    delete: deleteRoom,
};
