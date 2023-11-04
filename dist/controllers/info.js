"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoController = void 0;
const express_1 = require("express");
const Info_json_1 = __importDefault(require("../data/Info.json"));
exports.infoController = (0, express_1.Router)();
exports.infoController.get("/", async (_req, res) => {
    try {
        await res.json(Info_json_1.default);
    }
    catch (error) {
        res.status(400).json("Error al obtener las información.");
    }
});
