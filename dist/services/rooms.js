"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const Rooms_model_1 = require("../models/Rooms.model");
async function getAllRooms() {
    const rooms = await Rooms_model_1.Rooms.find();
    if (rooms.length === 0)
        throw new Error("Error al obtener las habitaciones.");
    return rooms;
}
async function getOneRoom(roomId) {
    const room = await Rooms_model_1.Rooms.findById(roomId);
    if (!room)
        throw new Error("No hay ninguna habitacion con ese id.");
    return room;
}
async function postNewRoom(room) {
    const newRoom = await Rooms_model_1.Rooms.create(room);
    if (!newRoom)
        throw new Error("Tu habitacion no se añadio correctamente.");
    return newRoom;
}
async function updateRoom(roomId, update) {
    const updatedRoom = await Rooms_model_1.Rooms.findByIdAndUpdate(roomId, update, {
        new: true,
    });
    if (!updatedRoom) {
        throw new Error("No puedes modificar una habitacion que no existe.");
    }
    return updatedRoom;
}
async function deleteRoom(roomId) {
    const deletedRoom = await Rooms_model_1.Rooms.findByIdAndDelete(roomId);
    if (!deletedRoom) {
        throw new Error("No hay ninguna habitacion con ese id.");
    }
    return deletedRoom;
}
exports.roomService = {
    getAllRooms,
    getOneRoom,
    postNewRoom,
    updateRoom,
    delete: deleteRoom,
};
