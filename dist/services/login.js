"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const defaultUser = {
    user: "admin",
    password: "admin",
};
const secretToken = process.env.SECRET_KEY || "";
async function login(user, password) {
    if (defaultUser.user !== user || defaultUser.password !== password) {
        throw new Error("Username or Password Incorrect!");
    }
    return await signJWT({ user });
}
function signJWT(payload) {
    const token = jsonwebtoken_1.default.sign(payload, secretToken);
    return { payload, token };
}
function verifyJWT(token) {
    const payload = jsonwebtoken_1.default.verify(token, secretToken);
    return payload;
}
const authService = {
    login,
    signJWT,
    verifyJWT,
};
exports.default = authService;
