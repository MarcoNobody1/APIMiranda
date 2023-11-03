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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bookings_1 = require("./controllers/bookings");
const rooms_1 = require("./controllers/rooms");
const login_1 = require("./controllers/login");
const auth_1 = __importDefault(require("./middleware/auth"));
const contacts_1 = require("./controllers/contacts");
const users_1 = require("./controllers/users");
const info_1 = require("./controllers/info");
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const serverHost = (process.argv.includes("--atlas") ? process.env.ATLAS_SERVER : process.env.SERVER_URL) || '';
const databaseName = process.env.DB_NAME || "";
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(serverHost, {
            dbName: databaseName,
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log("CONNECTED");
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}))();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// public routes & middleware
exports.app.use("/", info_1.infoController);
exports.app.use("/login", login_1.loginController);
exports.app.use(auth_1.default);
// private routes
exports.app.use("/bookings", bookings_1.bookingsController);
exports.app.use("/rooms", rooms_1.roomsController);
exports.app.use("/users", users_1.usersController);
exports.app.use("/contacts", contacts_1.contactsController);
