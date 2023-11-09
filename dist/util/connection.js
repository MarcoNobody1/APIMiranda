"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndConnection = exports.QueryHandler = void 0;
require("dotenv/config");
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DBNAME,
    port: parseInt(process.env.SQL_PORT || ""),
});
const QueryHandler = async (query, fields) => {
    const [result] = await pool.promise().query(query, fields);
    return result;
};
exports.QueryHandler = QueryHandler;
const EndConnection = async () => {
    return pool.end();
};
exports.EndConnection = EndConnection;
