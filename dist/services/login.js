"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const Users_model_1 = require("../models/Users.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const secretToken = process.env.SECRET_KEY || "";
async function login(username, password) {
    const result = await Users_model_1.Users.findOne({ username: username });
    if (!result)
        throw new Error("Not valid Username!");
    const email = result.email;
    const avatar = result.avatar;
    const passwordOk = await bcryptjs_1.default.compare(password, result.password || "");
    if (!passwordOk)
        throw new Error("Something went wrong. Email or Password Incorrect.");
    return signJWT({ username, email, avatar });
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
