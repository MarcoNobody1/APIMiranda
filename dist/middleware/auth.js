"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../services/login"));
function authMiddleware(req, res, next) {
    try {
        const token = req.get('token') || '';
        login_1.default.verifyJWT(token);
        next();
    }
    catch (error) {
        res.status(404).send(`${error}`);
    }
}
exports.default = authMiddleware;
