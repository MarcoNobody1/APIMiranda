"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const faker_1 = require("@faker-js/faker");
const connection_1 = require("./connection");
require("dotenv/config");
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
        console.error("Error al conectar a MySQL: " + err.message);
    }
    else {
        console.log("Conexión exitosa a MySQL");
        // Crea la base de datos
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DBNAME}`, (error) => {
            if (error) {
                console.error("Error al crear la base de datos: " + error.message);
            }
            else {
                console.log(`Base de datos "${process.env.SQL_DBNAME}" creada con éxito`);
            }
            // Cierra la conexión a MySQL
            connection.end((closeError) => {
                if (closeError) {
                    console.error("Error al cerrar la conexión: " + closeError.message);
                }
                else {
                    console.log("Conexión cerrada correctamente");
                }
            });
        });
    }
});
const ITERATIONS = 10;
const BOOKINGITERATIONS = ITERATIONS * 8;
async function seedDatabase() {
    try {
        console.log("CONNECTED TO DATABASE");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS amenity (
      id INT NOT NULL AUTO_INCREMENT,
      amenity VARCHAR(45) NOT NULL,
      PRIMARY KEY (id))`);
        console.log("AMENITY TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS room (
      id INT NOT NULL AUTO_INCREMENT,
      number VARCHAR(10) NOT NULL,
      type VARCHAR(45) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      discount INT NOT NULL,
      availability VARCHAR(45) NOT NULL,
      PRIMARY KEY (id))`);
        console.log("ROOM TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS booking (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(45) NOT NULL,
      apellido VARCHAR(45) NOT NULL,
      order_date DATE NOT NULL,
      check_in DATETIME NOT NULL,
      check_out DATETIME NOT NULL,
      special_request VARCHAR(255) NOT NULL,
      room_id INT NOT NULL,
      price VARCHAR(45) NOT NULL,
      status VARCHAR(45) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (room_id)
          REFERENCES room (id)
          ON DELETE CASCADE ON UPDATE CASCADE);`);
        console.log("BOOKING TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS photos (
      id INT NOT NULL AUTO_INCREMENT,
      photo_url VARCHAR(255) NOT NULL,
      room_id INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (room_id)
          REFERENCES room (id)
          ON DELETE CASCADE ON UPDATE CASCADE
  )`);
        console.log("PHOTO TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS room_amenities (
      room_id INT NOT NULL,
      amenity_id INT NOT NULL,
      FOREIGN KEY (room_id)
          REFERENCES room (id)
          ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (amenity_id)
          REFERENCES amenity (id)
  )`);
        console.log("ROOM_AMENITIES TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS contact (
      id INT NOT NULL AUTO_INCREMENT,
      date DATETIME NOT NULL,
      name VARCHAR(45) NOT NULL,
      email VARCHAR(45) NOT NULL,
      phone VARCHAR(45) NOT NULL,
      subject VARCHAR(45) NOT NULL,
      comment VARCHAR(255) NOT NULL,
      archived BINARY NOT NULL,
      PRIMARY KEY (id)
  )`);
        console.log("CONTACT TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`CREATE TABLE IF NOT EXISTS user (
      id INT NOT NULL AUTO_INCREMENT,
      photo VARCHAR(255) NOT NULL,
      username VARCHAR(45) NOT NULL,
      position VARCHAR(45) NOT NULL,
      email VARCHAR(45) NOT NULL,
      password VARCHAR(45) NOT NULL,
      start_date DATE NOT NULL,
      job_description VARCHAR(255) NOT NULL,
      contact VARCHAR(45) NOT NULL,
      activity VARCHAR(45) NOT NULL,
      PRIMARY KEY (id)
  )`);
        console.log("USER TABLE CREATED!");
        await (0, connection_1.QueryHandler)(`INSERT INTO amenity (amenity) 
    VALUES ("1/3 Bed Space"),("24-Hour Guard"),("Free Wifi"),("Air Conditioner"),("Television"),("Towels"),("Mini Bar"),("Coffee Set"),("Bathtub"),("Jacuzzi"), ("Nice Views")`);
        console.log("Amenities seeded! :)");
        for (let i = 0; i < ITERATIONS; i++) {
            const query = `INSERT INTO room (number, type, description, price, discount, availability) VALUES (?,?,?,?,?,?)`;
            const fields = [
                faker_1.faker.number.int({ min: 100, max: 300 }),
                faker_1.faker.helpers.arrayElement([
                    "Single Room",
                    "Double Room",
                    "Double Superior",
                    "Suite",
                ]),
                faker_1.faker.lorem.sentence({ min: 8, max: 15 }),
                faker_1.faker.number.int({ min: 100, max: 300 }),
                Math.ceil(faker_1.faker.number.int({ min: 5, max: 30 }) / 5) * 5,
                faker_1.faker.helpers.arrayElement(["Available", "Booked"]),
            ];
            const newRoom = await (0, connection_1.QueryHandler)(query, fields);
            const roomId = newRoom.insertId;
            const query2 = "INSERT INTO photos (photo_url, room_id) VALUES (?, ?)";
            const fields2 = [faker_1.faker.image.urlPicsumPhotos(), roomId];
            await (0, connection_1.QueryHandler)(query2, fields2);
            const query3 = `INSERT INTO room_amenities (room_id, amenity_id) VALUES (${roomId},1), (${roomId},2), (${roomId},3), (${roomId},4), (${roomId},5), (${roomId},6)`;
            await (0, connection_1.QueryHandler)(query3);
        }
        console.log("Rooms seeded! :)");
        for (let i = 0; i < BOOKINGITERATIONS; i++) {
            const query = "INSERT INTO booking (nombre, apellido, order_date, check_in, check_out, special_request, room_id, price, status) VALUES (?,?,?,?,?,?,?,?,?)";
            const fields = [
                faker_1.faker.person.firstName(),
                faker_1.faker.person.lastName(),
                faker_1.faker.date.between({ from: "2020-01-01", to: "2020-02-01" }),
                faker_1.faker.date.between({ from: "2020-03-01", to: "2020-03-31" }),
                faker_1.faker.date.between({ from: "2020-04-01", to: "2020-04-30" }),
                faker_1.faker.lorem.sentence({ min: 7, max: 25 }),
                faker_1.faker.number.int({ min: 1, max: 10 }),
                faker_1.faker.number.int({ min: 100, max: 300 }),
                faker_1.faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
            ];
            await (0, connection_1.QueryHandler)(query, fields);
        }
        console.log("Bookings seeded! :)");
        for (let i = 0; i < ITERATIONS; i++) {
            const query = "INSERT INTO contact (date, name, email, phone, subject, comment, archived) VALUES (?,?,?,?,?,?,?)";
            const fields = [
                faker_1.faker.date.between({ from: "2020-01-01", to: "2021-01-01" }),
                faker_1.faker.person.fullName(),
                faker_1.faker.internet.email({
                    provider: "anymail.com",
                    allowSpecialCharacters: false,
                }),
                faker_1.faker.phone.number(),
                faker_1.faker.lorem.sentence({ min: 1, max: 4 }),
                faker_1.faker.lorem.sentences({ min: 1, max: 3 }),
                faker_1.faker.datatype.boolean(),
            ];
            await (0, connection_1.QueryHandler)(query, fields);
        }
        console.log("Contacts seeded! :)");
        for (let i = 0; i < ITERATIONS; i++) {
            const query = "INSERT INTO user (photo, username, position, email, password, start_date, job_description, contact, activity) VALUES (?,?,?,?,?,?,?,?,?)";
            const fields = [
                faker_1.faker.image.avatar(),
                faker_1.faker.internet.userName(),
                faker_1.faker.helpers.arrayElement(["Room Service", "Receptionist", "Manager"]),
                faker_1.faker.internet.email({
                    provider: "mirandahotel.com",
                    allowSpecialCharacters: false,
                }),
                faker_1.faker.internet.password({ length: 20 }),
                faker_1.faker.date.between({ from: "2023-11-01", to: "2023-12-31" }),
                faker_1.faker.person.jobTitle(),
                faker_1.faker.phone.number(),
                faker_1.faker.helpers.arrayElement(["active", "inactive"]),
            ];
            await (0, connection_1.QueryHandler)(query, fields);
        }
        console.log("Users seeded! :)");
    }
    catch (error) {
        throw new Error(`${error}`);
    }
    finally {
        (0, connection_1.EndConnection)();
    }
}
setTimeout(() => {
    seedDatabase();
}, 2000);
