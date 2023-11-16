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
const serverHost = (process.argv.includes("atlas")
    ? process.env.ATLAS_SERVER
    : process.env.SERVER_URL) || "";
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
                photos: faker_1.faker.helpers.arrayElements([
                    "https://drive.google.com/uc?id=1jXhbqo_gUMvulPG8n8e1j4dijekpHLr8",
                    "https://drive.google.com/uc?id=1KMksFwpQbrKk8Uvtm0PNCjofwP-WI4RV",
                    "https://drive.google.com/uc?id=1HZB5MtKjpFpLnql1cNlpPYmbyL4NKhP7",
                    "https://drive.google.com/uc?id=1u8ymD1Ru316qMc-kwUX6PIBhN12ZGsgI",
                    "https://drive.google.com/uc?id=19ReuAI0Ev0XiT9cqhFr-P2VordnUTYAZ",
                ], { min: 3, max: 3 }),
                number: faker_1.faker.number.int({ min: 100, max: 300 }),
                description: faker_1.faker.lorem.sentence({ min: 10, max: 40 }),
                type: faker_1.faker.helpers.arrayElement([
                    "Single Room",
                    "Double Room",
                    "Double Superior",
                    "Suite",
                ]),
                amenities: faker_1.faker.helpers.arrayElement([
                    [
                        "1/3 Bed Space",
                        "Air Conditioner",
                        "Television",
                        "Towels",
                        "Coffee Set",
                    ],
                    [
                        "1/2 Bathroom",
                        "Free Wifi",
                        "Air Conditioner",
                        "Television",
                        "Towels",
                        "Mini Bar",
                        "Coffee Set",
                    ],
                    [
                        "1/3 Bed Space",
                        "24-Hour Guard",
                        "Free Wifi",
                        "Air Conditioner",
                        "Television",
                        "Towels",
                        "Mini Bar",
                        "Coffee Set",
                        "Nice Views",
                    ],
                    [
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
                    ],
                ]),
                price: faker_1.faker.number.int({ min: 100, max: 300 }),
                discount: Math.ceil(faker_1.faker.number.int({ min: 5, max: 30 }) / 5) * 5,
                availability: faker_1.faker.helpers.arrayElement(["Available", "Booked"]),
            };
            rooms.push(roomData);
        }
        const insertedRooms = await Rooms_model_1.Rooms.insertMany(rooms);
        console.log("Rooms seeded! :)");
        const bookings = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const index = Math.floor(Math.random() * ITERATIONS);
            const room = insertedRooms[index];
            const bookingData = {
                name: faker_1.faker.person.firstName(),
                surname: faker_1.faker.person.lastName(),
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
                room_id: room._id,
                room_photos: room.photos,
                room_type: room.type,
                room_number: room.number.toString(),
                room_amenities: room.amenities,
                room_description: room.description,
                price: room.price,
                status: faker_1.faker.helpers.arrayElement([
                    "Check In",
                    "Check Out",
                    "In Progress",
                ]),
            };
            bookings.push(bookingData);
        }
        await Bookings_model_1.Bookings.insertMany(bookings);
        console.log("Bookings seeded! :)");
        const contacts = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const contactData = {
                date: faker_1.faker.date
                    .between({ from: "2020-01-01", to: "2021-01-01" })
                    .toString(),
                name: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email({
                    provider: "anymail.com",
                    allowSpecialCharacters: false,
                }),
                phone: faker_1.faker.phone.number(),
                subject: faker_1.faker.lorem.sentence({ min: 3, max: 8 }),
                comment: faker_1.faker.lorem.sentences({ min: 1, max: 3 }),
                archived: faker_1.faker.datatype.boolean(),
            };
            contacts.push(contactData);
        }
        await Contacts_model_1.Contacts.insertMany(contacts);
        console.log("Contacts seeded! :)");
        const users = [];
        for (let i = 0; i < ITERATIONS; i++) {
            const userData = {
                avatar: faker_1.faker.image.avatarGitHub(),
                username: faker_1.faker.internet.userName(),
                position: faker_1.faker.helpers.arrayElement([
                    "Room Service",
                    "Receptionist",
                    "Manager",
                ]),
                email: faker_1.faker.internet.email({
                    provider: "mirandahotel.com",
                    allowSpecialCharacters: false,
                }),
                password: faker_1.faker.internet.password({ length: 20 }),
                start_date: faker_1.faker.date
                    .between({ from: "2023-11-01", to: "2023-12-31" })
                    .toString(),
                job_description: faker_1.faker.person.jobTitle(),
                contact: faker_1.faker.phone.number(),
                activity: faker_1.faker.helpers.arrayElement(["active", "inactive"]),
            };
            users.push(userData);
        }
        await Users_model_1.Users.insertMany(users);
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
seedDatabase();
