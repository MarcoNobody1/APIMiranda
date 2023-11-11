"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const Users_model_1 = require("../models/Users.model");
async function getAllUsers() {
    const users = await Users_model_1.Users.find();
    if (users.length === 0)
        throw new Error("Error al obtener los usuarios.");
    return users;
}
async function getOneUser(userId) {
    const user = await Users_model_1.Users.findById(userId);
    if (!user)
        throw new Error("No hay ningun usuario con ese id.");
    return user;
}
async function postNewUser(User) {
    const newUser = await Users_model_1.Users.create(User);
    if (!newUser)
        throw new Error("Tu usuario no se añadio correctamente.");
    return newUser;
}
async function updateUser(userId, update) {
    const updatedUser = await Users_model_1.Users.findByIdAndUpdate(userId, update, {
        new: true,
    });
    if (!updatedUser) {
        throw new Error("No puedes modificar un usuario que no existe.");
    }
    return updatedUser;
}
async function deleteUser(userId) {
    const deletedUser = await Users_model_1.Users.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error("No hay ningun usuario con ese id.");
    }
    return deletedUser;
}
exports.userService = {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateUser,
    delete: deleteUser,
};
