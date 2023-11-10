"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const express_1 = require("express");
const users_1 = require("../services/users");
const validation_1 = require("../middleware/validation");
const RoomSchema_1 = require("../schemas/RoomSchema");
exports.usersController = (0, express_1.Router)();
exports.usersController.get("/", async (_req, res) => {
    try {
        const result = await users_1.userService.getAllUsers();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
exports.usersController.get("/:id", async (req, res) => {
    try {
        const result = await users_1.userService.getOneUser(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.usersController.delete("/:id", async (req, res) => {
    try {
        const result = await users_1.userService.delete(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.usersController.put("/:id", (0, validation_1.genValidationMiddleware)(RoomSchema_1.RoomSchema), async (req, res) => {
    try {
        const result = await users_1.userService.updateUser(req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.usersController.post("/", (0, validation_1.genValidationMiddleware)(RoomSchema_1.RoomSchema), async (req, res) => {
    try {
        const result = await users_1.userService.postNewUser(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
