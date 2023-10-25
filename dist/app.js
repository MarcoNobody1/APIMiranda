"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bookings_1 = require("./controllers/bookings");
const rooms_1 = require("./controllers/rooms");
const login_1 = require("./controllers/login");
const auth_1 = __importDefault(require("./middleware/auth"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// public routes & middleware
exports.app.use('/login', login_1.loginController);
exports.app.use(auth_1.default);
// private routes
exports.app.use('/bookings', bookings_1.bookingsController);
exports.app.use('/rooms', rooms_1.roomsController);
// app.use('/users', usersController)  
// app.use('/contacts', contactsController)    
