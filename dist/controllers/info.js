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
exports.infoController = void 0;
const express_1 = require("express");
const Info_json_1 = __importDefault(require("../data/Info.json"));
exports.infoController = (0, express_1.Router)();
exports.infoController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.json(Info_json_1.default);
    }
    catch (error) {
        res.status(400).send("Error al obtener las información.");
    }
}));
