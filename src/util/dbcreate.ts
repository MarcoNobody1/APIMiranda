import mysql from "mysql2";
import { faker } from "@faker-js/faker";
import { EndConnection, QueryHandler } from "./connection";
import "dotenv/config";

// Configura la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.SQL_URL,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  port: parseInt(process.env.SQL_PORT || ""),
});

// Conecta a MySQL
connection.connect((err: any) => {
  if (err) {
    console.error("Error al conectar a MySQL: " + err.message);
  } else {
    console.log("Conexión exitosa a MySQL");

    // Crea la base de datos
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DBNAME}`,
      (error: any) => {
        if (error) {
          console.error("Error al crear la base de datos: " + error.message);
        } else {
          console.log(
            `Base de datos "${process.env.SQL_DBNAME}" creada con éxito`
          );
        }

        // Cierra la conexión a MySQL
        connection.end((closeError: any) => {
          if (closeError) {
            console.error("Error al cerrar la conexión: " + closeError.message);
          } else {
            console.log("Conexión cerrada correctamente");
          }
        });
      }
    );
  }
});

const ITERATIONS: number = 10;
const MAXITERATIONS: number = ITERATIONS * 8;

async function seedDatabase() {
  try {
    console.log("CONNECTED TO DATABASE");

    await QueryHandler(`CREATE TABLE IF NOT EXISTS amenity (
      id INT NOT NULL AUTO_INCREMENT,
      amenity VARCHAR(45) NOT NULL,
      PRIMARY KEY (id))`);

    console.log("AMENITY TABLE CREATED!");

    await QueryHandler(`CREATE TABLE IF NOT EXISTS room (
      id INT NOT NULL AUTO_INCREMENT,
      number VARCHAR(10) NOT NULL,
      type VARCHAR(45) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      discount INT NOT NULL,
      availability VARCHAR(45) NOT NULL,
      PRIMARY KEY (id))`);

    console.log("ROOM TABLE CREATED!");

    await QueryHandler(`CREATE TABLE IF NOT EXISTS booking (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(45) NOT NULL,
      apellido VARCHAR(45) NOT NULL,
      order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

    await QueryHandler(`CREATE TABLE IF NOT EXISTS photos (
      id INT NOT NULL AUTO_INCREMENT,
      photo_url VARCHAR(255) NOT NULL,
      room_id INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (room_id)
          REFERENCES room (id)
          ON DELETE CASCADE ON UPDATE CASCADE
  )`);

    console.log("PHOTO TABLE CREATED!");

    await QueryHandler(`CREATE TABLE IF NOT EXISTS room_amenities (
      room_id INT NOT NULL,
      amenity_id INT NOT NULL,
      FOREIGN KEY (room_id)
          REFERENCES room (id)
          ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (amenity_id)
          REFERENCES amenity (id)
  )`);

    console.log("ROOM_AMENITIES TABLE CREATED!");

    await QueryHandler(`CREATE TABLE IF NOT EXISTS contact (
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

    await QueryHandler(`CREATE TABLE IF NOT EXISTS user (
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

    await QueryHandler(`INSERT INTO amenity (amenity) 
    VALUES ("1/3 Bed Space"),("24-Hour Guard"),("Free Wifi"),("Air Conditioner"),("Television"),("Towels"),("Mini Bar"),("Coffee Set"),("Bathtub"),("Jacuzzi"), ("Nice Views")`);

    console.log("Amenities seeded! :)");

    for (let i = 0; i < MAXITERATIONS; i++) {
      const query = `INSERT INTO room (number, type, description, price, discount, availability) VALUES (?,?,?,?,?,?)`;
      const fields = [
        faker.number.int({ min: 100, max: 300 }),
        faker.helpers.arrayElement([
          "Single Room",
          "Double Room",
          "Double Superior",
          "Suite",
        ]),
        faker.lorem.sentence({ min: 10, max: 12 }),
        faker.number.int({ min: 100, max: 300 }),
        Math.random() < 0.5
          ? 0
          : Math.ceil(faker.number.int({ min: 1, max: 30 }) / 5) * 5,
        faker.helpers.arrayElement(["Available", "Booked"]),
      ];

      const newRoom: any = await QueryHandler(query, fields);

      const roomId = newRoom.insertId;

      const query2 = "INSERT INTO photos (photo_url, room_id) VALUES (?, ?)";

      const fields2 = [
        faker.helpers.arrayElement([
          "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room1.jpeg",
          "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room2.jpeg",
          "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room3.jpeg",
          "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room4.jpeg",
          "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room5.jpeg",
        ]),
        roomId,
      ];

      await QueryHandler(query2, fields2);

      const query3 = `INSERT INTO room_amenities (room_id, amenity_id) VALUES (${roomId},1), (${roomId},2), (${roomId},3), (${roomId},4), (${roomId},5), (${roomId},6)`;

      await QueryHandler(query3);
    }

    console.log("Rooms seeded! :)");

    for (let i = 0; i < MAXITERATIONS; i++) {
      const today = new Date();

      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 365);

      const futureDatePlus = new Date(futureDate);
      futureDatePlus.setDate(futureDate.getDate() + 1);

      const existingDatesQuery =
        "SELECT check_in, check_out FROM booking WHERE (check_in BETWEEN ? AND ?) OR (check_out BETWEEN ? AND ?)";
      const existingDatesFields = [
        today,
        futureDatePlus,
        today,
        futureDatePlus,
      ];
      const existingDates = await QueryHandler(
        existingDatesQuery,
        existingDatesFields
      );

      let checkInDate, checkOutDate;
      do {
        checkInDate = faker.date.between({
          from: today,
          to: futureDate,
        });

        checkOutDate = faker.date.between({
          from: checkInDate,
          to: futureDatePlus,
        });
      } while (datesOverlap(existingDates, checkInDate, checkOutDate));

      const query =
        "INSERT INTO booking (nombre, apellido, order_date, check_in, check_out, special_request, room_id, price, status) VALUES (?,?,?,?,?,?,?,?,?)";

      const fields = [
        faker.person.firstName(),
        faker.person.lastName(),
        new Date(),
        checkInDate,
        checkOutDate,
        faker.lorem.sentence({ min: 7, max: 25 }),
        faker.number.int({ min: 1, max: 80 }),
        faker.number.int({ min: 100, max: 300 }),
        faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
      ];

      await QueryHandler(query, fields);
    }

    function datesOverlap(
      existingDates: any,
      newCheckIn: any,
      newCheckOut: any
    ) {
      for (const { check_in, check_out } of existingDates) {
        if (
          (newCheckIn >= check_in && newCheckIn < check_out) ||
          (newCheckOut > check_in && newCheckOut <= check_out) ||
          (newCheckIn <= check_in && newCheckOut >= check_out)
        ) {
          return true;
        }
      }
      return false;
    }

    console.log("Bookings seeded! :)");

    for (let i = 0; i < ITERATIONS; i++) {
      const query =
        "INSERT INTO contact (date, name, email, phone, subject, comment, archived) VALUES (?,?,?,?,?,?,?)";

      const today = new Date();

      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - 365);

      const fields = [
        faker.date.between({ from: pastDate, to: today }),
        faker.person.fullName(),
        faker.internet.email({
          provider: "anymail.com",
          allowSpecialCharacters: false,
        }),
        faker.phone.number(),
        faker.lorem.sentence({ min: 1, max: 4 }),
        faker.lorem.sentences({ min: 1, max: 3 }),
        faker.datatype.boolean(),
      ];

      await QueryHandler(query, fields);
    }

    console.log("Contacts seeded! :)");

    for (let i = 0; i < ITERATIONS; i++) {
      const query =
        "INSERT INTO user (photo, username, position, email, password, start_date, job_description, contact, activity) VALUES (?,?,?,?,?,?,?,?,?)";

      const today = new Date();

      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 365);

      const fields = [
        faker.image.avatar(),
        faker.internet.userName(),
        faker.helpers.arrayElement(["Room Service", "Receptionist", "Manager"]),
        faker.internet.email({
          provider: "mirandahotel.com",
          allowSpecialCharacters: false,
        }),
        faker.internet.password({ length: 20 }),
        faker.date.between({ from: today, to: futureDate }),
        faker.person.jobTitle(),
        faker.phone.number(),
        faker.helpers.arrayElement(["active", "inactive"]),
      ];

      await QueryHandler(query, fields);
    }

    console.log("Users seeded! :)");
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    EndConnection();
  }
}

setTimeout(() => {
  seedDatabase();
}, 2000);
