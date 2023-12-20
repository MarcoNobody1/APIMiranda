"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const mongodb_1 = require("mongodb");
const serverHost = process.env.ATLAS_SERVER || "";
const databaseName = process.env.DB_NAME || "";
const ConnectToDatabase = async () => {
    console.log(serverHost);
    try {
        await mongoose_1.default.connect(serverHost, {
            dbName: databaseName || "MirandaDashboard",
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
};
exports.ConnectToDatabase = ConnectToDatabase;
