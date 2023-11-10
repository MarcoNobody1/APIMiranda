"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RoomSchema = joi_1.default.object({
    number: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    discount: joi_1.default.number().required(),
    availability: joi_1.default.string().required(),
});
