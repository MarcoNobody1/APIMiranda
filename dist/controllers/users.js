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
exports.usersController = void 0;
const express_1 = require("express");
const users_1 = require("../services/users");
exports.usersController = (0, express_1.Router)();
exports.usersController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.userService.getAllUsers();
        res.send(result);
    }
    catch (error) {
        res.status(500).json("Error al obtener los mensajes.");
    }
}));
exports.usersController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.userService.getOneUser(req.params.id);
        res.send(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.usersController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.userService.delete(req.params.id);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.usersController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.userService.updateUser(req.params.id, req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.usersController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.userService.postNewUser(req.body);
        res.status(200).json(`Your user is number ${result}`);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
