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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = exports.Rooms = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
exports.Rooms = rooms_json_1.default;
function getAllrooms() {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.Rooms;
        if (data.length === 0)
            throw new Error("No existen reservas.");
        return data;
    });
}
function getOneRoom(RoomId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.Rooms.filter((Room) => Room.room_name.id === RoomId);
        if (data.length === 0)
            throw new Error("No hay ninguna reserva con ese id.");
        return data;
    });
}
function postNewRoom(Room) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const initialLength = exports.Rooms.length;
        const data = yield exports.Rooms.push(Room);
        if (data === initialLength)
            throw new Error("Tu reserva no se añadio correctamente.");
        return data;
    });
}
function updateRoom(RoomId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const RoomIndex = yield exports.Rooms.findIndex((Room) => Room.room_name.id === RoomId);
        if (RoomIndex === -1)
            throw new Error("No puedes modificar una reserva que no existe.");
        const data = [...exports.Rooms];
        Object.assign(data[RoomIndex], update);
        return data;
    });
}
function deleteRoom(RoomId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const RoomIndex = yield exports.Rooms.findIndex((Room) => Room.room_name.id === RoomId);
        if (RoomIndex === -1)
            throw new Error("No hay ninguna reserva con ese id.");
        const data = exports.Rooms.splice(RoomIndex, 1);
        return data;
    });
}
exports.roomService = {
    getAllrooms,
    getOneRoom,
    postNewRoom,
    updateRoom,
    delete: deleteRoom,
};
