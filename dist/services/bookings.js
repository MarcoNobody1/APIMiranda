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
exports.bookingService = exports.bookings = void 0;
const Bookings_json_1 = __importDefault(require("../data/Bookings.json"));
exports.bookings = Bookings_json_1.default;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get all bookings from json file
    });
}
function getById(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get a booking by id from json file
    });
}
function post(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        // Save a booking to json file
    });
}
function put(bookingId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        // Update a booking by id and save to json file
    });
}
function _delete(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Delete a booking by id from json file
    });
}
exports.bookingService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
