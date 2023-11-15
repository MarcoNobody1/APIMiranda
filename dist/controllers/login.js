"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const express_1 = require("express");
const login_1 = __importDefault(require("../services/login"));
exports.loginController = (0, express_1.Router)();
exports.loginController.post("/", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await login_1.default.login(username, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
});
