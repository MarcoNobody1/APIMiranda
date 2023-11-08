"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandler = exports.Connection = void 0;
require("dotenv/config");
const mysql2_1 = __importDefault(require("mysql2"));
const Connection = () => {
    const pool = mysql2_1.default.createPool({
        host: process.env.SQL_URL,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DBNAME,
        port: parseInt(process.env.SQL_PORT || ""),
    });
    console.log("CONNECTED!");
    return pool;
};
exports.Connection = Connection;
const QueryHandler = async (query, fields) => {
    const [result] = await (0, exports.Connection)().promise().query(query, fields);
    return result;
};
exports.QueryHandler = QueryHandler;
