"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const Rooms_model_1 = require("../models/Rooms.model");
const Bookings_model_1 = require("../models/Bookings.model");
const Contacts_model_1 = require("../models/Contacts.model");
const Users_model_1 = require("../models/Users.model");
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const ITERATIONS = 10;
const serverHost = (process.argv.includes("atlas") ? process.env.ATLAS_SERVER : process.env.SERVER_URL) || '';
const databaseName = process.env.DB_NAME || "";
async function seedDatabase() {
    console.log(serverHost);
    try {
        await mongoose_1.default.connect(serverHost, {
            dbName: databaseName,
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log("CONNECTED");
        const rooms = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const roomData = {
                room_name: {
                    id: faker_1.faker.string.uuid(),
                    room_photo: faker_1.faker.image.urlPicsumPhotos(),
                    room_number: faker_1.faker.number.int({ min: 100, max: 300 }),
                    room_description: faker_1.faker.lorem.sentence({ min: 10, max: 40 }),
                },
                room_type: faker_1.faker.helpers.arrayElement([
                    "Single Room",
                    "Double Room",
                    "Double Superior",
                    "Suite",
                ]),
                amenities: faker_1.faker.helpers.arrayElements([
                    "1/3 Bed Space",
                    "24-Hour Guard",
                    "Free Wifi",
                    "Air Conditioner",
                    "Television",
                    "Towels",
                    "Mini Bar",
                    "Coffee Set",
                    "Bathtub",
                    "Jacuzzi",
                    "Nice Views",
                ], { min: 3, max: 11 }),
                price: faker_1.faker.number.int({ min: 100, max: 300 }),
                offer_price: {
                    isOffer: faker_1.faker.datatype.boolean(),
                    discount: Math.ceil(faker_1.faker.number.int({ min: 5, max: 30 }) / 5) * 5,
                },
                availability: faker_1.faker.helpers.arrayElement(["Available", "Booked"]),
            };
            rooms.push(roomData);
        }
        Rooms_model_1.Rooms.insertMany(rooms);
        console.log("Rooms seeded! :)");
        const bookings = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const index = Math.floor(Math.random() * ITERATIONS);
            const room = rooms[index];
            const bookingData = {
                guest: {
                    nombre: faker_1.faker.person.firstName(),
                    apellidos: faker_1.faker.person.lastName(),
                    id_reserva: faker_1.faker.string.uuid(),
                },
                order_date: faker_1.faker.date
                    .between({ from: "2020-01-01", to: "2020-02-01" })
                    .toString(),
                check_in: faker_1.faker.date
                    .between({ from: "2020-03-01", to: "2020-03-31" })
                    .toString(),
                check_out: faker_1.faker.date
                    .between({ from: "2020-04-01", to: "2020-04-30" })
                    .toString(),
                special_request: faker_1.faker.lorem.sentence({ min: 7, max: 25 }),
                room: {
                    id: room.room_name.id,
                    room_type: room.room_type,
                    room_number: room.room_name.room_number.toString(),
                    price: room.price,
                    amenities: room.amenities,
                    room_description: room.room_name.room_description,
                },
                status: faker_1.faker.helpers.arrayElement([
                    "Check In",
                    "Check Out",
                    "In Progress",
                ]),
            };
            bookings.push(bookingData);
        }
        Bookings_model_1.Bookings.insertMany(bookings);
        console.log("Bookings seeded! :)");
        const contacts = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const contactData = {
                date: {
                    id: faker_1.faker.string.uuid(),
                    send_date: faker_1.faker.date
                        .between({ from: "2020-01-01", to: "2021-01-01" })
                        .toString(),
                },
                customer: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email({
                        provider: "anymail.com",
                        allowSpecialCharacters: false,
                    }),
                    phone: faker_1.faker.phone.number(),
                },
                subject: faker_1.faker.lorem.sentence({ min: 3, max: 8 }),
                comment: faker_1.faker.lorem.sentences({ min: 1, max: 3 }),
                archived: faker_1.faker.datatype.boolean(),
            };
            contacts.push(contactData);
        }
        Contacts_model_1.Contacts.insertMany(contacts);
        console.log("Contacts seeded! :)");
        const users = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const userData = {
                name: {
                    photo: faker_1.faker.image.avatar(),
                    username: faker_1.faker.internet.userName(),
                    id: faker_1.faker.string.uuid(),
                    employee_position: faker_1.faker.helpers.arrayElement([
                        "Room Service",
                        "Receptionist",
                        "Manager",
                    ]),
                    email: faker_1.faker.internet.email({
                        provider: "mirandahotel.com",
                        allowSpecialCharacters: false,
                    }),
                    password_hash: faker_1.faker.internet.password({ length: 20 }),
                },
                start_date: faker_1.faker.date
                    .between({ from: "2023-11-01", to: "2023-12-31" })
                    .toString(),
                job_description: faker_1.faker.person.jobTitle(),
                contact: faker_1.faker.phone.number(),
                activity: faker_1.faker.helpers.arrayElement(["active", "inactive"]),
            };
            users.push(userData);
        }
        Users_model_1.Users.insertMany(users);
        console.log("Users seeded! :)");
    }
    catch (error) {
        throw new Error(`${error}`);
    }
    finally {
        setTimeout(() => {
            mongoose_1.default.disconnect();
        }, 2000);
    }
}
;
seedDatabase();
