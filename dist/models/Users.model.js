"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const usersSchema = new Schema({
    avatar: { type: String, required: true },
    username: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    start_date: { type: String, required: true },
    job_description: { type: String, required: true },
    contact: { type: String, required: true },
    activity: { type: String, required: true },
});
exports.Users = mongoose_1.default.model("Users", usersSchema);
