"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
// Configura la conexión a MySQL
const connection = mysql2_1.default.createConnection({
    host: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: parseInt(process.env.SQL_PORT || ""),
});
// Conecta a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL: ' + err.message);
    }
    else {
        console.log('Conexión exitosa a MySQL');
        // Crea la base de datos
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DBNAME}`, (error) => {
            if (error) {
                console.error('Error al crear la base de datos: ' + error.message);
            }
            else {
                console.log(`Base de datos "${process.env.SQL_DBNAME}" creada con éxito`);
            }
            // Cierra la conexión a MySQL
            connection.end((closeError) => {
                if (closeError) {
                    console.error('Error al cerrar la conexión: ' + closeError.message);
                }
                else {
                    console.log('Conexión cerrada correctamente');
                }
            });
        });
    }
});
