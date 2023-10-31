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
exports.userService = exports.users = void 0;
const Users_json_1 = __importDefault(require("../data/Users.json"));
exports.users = Users_json_1.default;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.users;
        if (data.length === 0)
            throw new Error("No existen reservas.");
        return data;
    });
}
function getOneUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.users.filter((user) => user.name.id === userId);
        if (data.length === 0)
            throw new Error("No hay ninguna reserva con ese id.");
        return data;
    });
}
function postNewUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const initialLength = exports.users.length;
        const data = yield exports.users.push(user);
        if (data === initialLength)
            throw new Error("Tu reserva no se añadio correctamente.");
        return data;
    });
}
function updateUser(userId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const userIndex = yield exports.users.findIndex((user) => user.name.id === userId);
        if (userIndex === -1)
            throw new Error("No puedes modificar una reserva que no existe.");
        const data = [...exports.users];
        Object.assign(data[userIndex], update);
        return data;
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const userIndex = yield exports.users.findIndex((user) => user.name.id === userId);
        if (userIndex === -1)
            throw new Error("No hay ninguna reserva con ese id.");
        const data = exports.users.splice(userIndex, 1);
        return data;
    });
}
exports.userService = {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateUser,
    delete: deleteUser,
};
