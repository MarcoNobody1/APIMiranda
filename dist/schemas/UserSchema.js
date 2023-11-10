"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    photo: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    start_date: joi_1.default.date().required(),
    job_description: joi_1.default.string().required(),
    contact: joi_1.default.string().required(),
    activity: joi_1.default.string().required(),
});
