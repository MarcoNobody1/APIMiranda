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
exports.userService = void 0;
const Users_model_1 = require("../models/Users.model");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Users_model_1.Users.find();
        if (users.length === 0)
            throw new Error("Error al obtener los usuarios.");
        return users;
    });
}
function getOneUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Users_model_1.Users.findById(userId);
        if (!user)
            throw new Error("No hay ningun usuario con ese id.");
        return user;
    });
}
function postNewUser(User) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield Users_model_1.Users.create(User);
        if (!newUser)
            throw new Error("Tu usuario no se añadio correctamente.");
        return newUser;
    });
}
function updateUser(userId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = yield Users_model_1.Users.findByIdAndUpdate(userId, update, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error("No puedes modificar un usuario que no existe.");
        }
        return updatedUser;
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield Users_model_1.Users.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("No hay ningun usuario con ese id.");
        }
        return deletedUser;
    });
}
exports.userService = {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateUser,
    delete: deleteUser,
};
