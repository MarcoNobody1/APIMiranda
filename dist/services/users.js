"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
async function getAllUsers() {
    const query = "SELECT * FROM user";
    const users = await QueryHandler(query);
    return users;
}
async function getOneUser(userId) {
    const query = "SELECT * FROM user WHERE id = ?";
    const fields = [userId];
    const user = await QueryHandler(query, fields);
    return user;
}
async function postNewUser(user) {
    const query = "INSERT INTO user (photo, username, position, email, password, start_date, job_description, contact, activity) VALUES (?,?,?,?,?,?,?,?,?)";
    const fields = [
        user.avatar,
        user.username,
        user.position,
        user.email,
        user.password,
        user.start_date,
        user.job_description,
        user.contact,
        user.activity,
    ];
    const newUser = await QueryHandler(query, fields);
    return newUser;
}
async function updateUser(userId, update) {
    const query = "UPDATE user SET photo = ?, username = ?, position = ?, email = ?, password = ?, start_date = ?, job_description = ?, contact = ?, activity = ? WHERE id = ?";
    const fields = [
        update.avatar,
        update.username,
        update.position,
        update.email,
        update.password,
        update.start_date,
        update.job_description,
        update.contact,
        update.activity,
        userId
    ];
    const updatedUser = await QueryHandler(query, fields);
    return updatedUser;
}
async function deleteUser(userId) {
    const query = "DELETE FROM user WHERE id = ?";
    const fields = [userId];
    const deletedUser = await QueryHandler(query, fields);
    return deletedUser;
}
exports.userService = {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateUser,
    delete: deleteUser,
};
