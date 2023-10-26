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
exports.loginController = void 0;
const express_1 = require("express");
const login_1 = __importDefault(require("../services/login"));
exports.loginController = (0, express_1.Router)();
exports.loginController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.user;
        const password = req.body.password;
        const result = yield login_1.default.login(username, password);
        res.send(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
