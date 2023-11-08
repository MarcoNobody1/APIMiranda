"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const connection_1 = require("../util/connection");
async function getAllRooms() {
    const query = "SELECT * FROM room";
    const rooms = await (0, connection_1.QueryHandler)(query);
    return rooms;
}
async function getOneRoom(roomId) {
    const query = "SELECT * FROM room WHERE id = ?";
    const fields = [roomId];
    const room = await (0, connection_1.QueryHandler)(query, fields);
    return room;
}
async function postNewRoom(room) {
    const query = "INSERT INTO room (number, type, description, price, discount, availability) VALUES (?,?,?,?,?,?)";
    const fields = [
        room.number,
        room.type,
        room.description,
        room.price,
        room.discount,
        room.availability,
    ];
    const newRoom = await (0, connection_1.QueryHandler)(query, fields);
    return newRoom;
}
async function updateRoom(roomId, update) {
    const query = "UPDATE room SET number = ?, type = ?, description = ?, price = ?, discount = ?, availability = ? WHERE id = ?";
    const fields = [
        update.number,
        update.type,
        update.description,
        update.price,
        update.discount,
        update.availability,
        roomId,
    ];
    const updatedRoom = await (0, connection_1.QueryHandler)(query, fields);
    return updatedRoom;
}
async function deleteRoom(roomId) {
    const query = "DELETE FROM room WHERE id = ?";
    const fields = [roomId];
    const deletedRoom = await (0, connection_1.QueryHandler)(query, fields);
    return deletedRoom;
}
exports.roomService = {
    getAllRooms,
    getOneRoom,
    postNewRoom,
    updateRoom,
    delete: deleteRoom,
};
