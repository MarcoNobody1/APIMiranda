import { faker } from "@faker-js/faker";
import { BookingInterface } from "../interfaces/Bookings";
import { RoomInterface } from "../interfaces/Rooms";
import { ContactInterface } from "../interfaces/Contacts";
import { UserInterface } from "../interfaces/Users";
import { Rooms } from "../models/Rooms.model";
import { Bookings } from "../models/Bookings.model";
import { Contacts } from "../models/Contacts.model";
import { Users } from "../models/Users.model";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import "dotenv/config";

const ITERATIONS: number = 10;
const serverHost: string =
  (process.argv.includes("atlas")
    ? process.env.ATLAS_SERVER
    : process.env.SERVER_URL) || "";
const databaseName: string = process.env.DB_NAME || "";

async function seedDatabase() {
  console.log(serverHost);

  try {
    await mongoose.connect(serverHost, {
      dbName: databaseName,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("CONNECTED");

    const rooms: RoomInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const roomData: RoomInterface = {
        photos: faker.image.urlPicsumPhotos(),
        number: faker.number.int({ min: 100, max: 300 }),
        description: faker.lorem.sentence({ min: 10, max: 40 }),
        type: faker.helpers.arrayElement([
          "Single Room",
          "Double Room",
          "Double Superior",
          "Suite",
        ]),
        amenities: faker.helpers.arrayElements(
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
          { min: 3, max: 11 }
        ),
        price: faker.number.int({ min: 100, max: 300 }),
        discount: Math.ceil(faker.number.int({ min: 5, max: 30 }) / 5) * 5,
        availability: faker.helpers.arrayElement(["Available", "Booked"]),
      };

      rooms.push(roomData);
    }

    const insertedRooms = await Rooms.insertMany(rooms);

    console.log("Rooms seeded! :)");

    const bookings: BookingInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const index = Math.floor(Math.random() * ITERATIONS);
      const room = insertedRooms[index];

      const bookingData: BookingInterface = {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        order_date: faker.date
          .between({ from: "2020-01-01", to: "2020-02-01" })
          .toString(),
        check_in: faker.date
          .between({ from: "2020-03-01", to: "2020-03-31" })
          .toString(),
        check_out: faker.date
          .between({ from: "2020-04-01", to: "2020-04-30" })
          .toString(),
        special_request: faker.lorem.sentence({ min: 7, max: 25 }),
        room_id: room._id,
        room_type: room.type,
        room_number: room.number.toString(),
        room_amenities: room.amenities,
        room_description: room.description,
        price: room.price,
        status: faker.helpers.arrayElement([
          "Check In",
          "Check Out",
          "In Progress",
        ]),
      };

      bookings.push(bookingData);
    }

    await Bookings.insertMany(bookings);
    console.log("Bookings seeded! :)");

    const contacts: ContactInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const contactData: ContactInterface = {
        date: faker.date
          .between({ from: "2020-01-01", to: "2021-01-01" })
          .toString(),
        name: faker.person.fullName(),
        email: faker.internet.email({
          provider: "anymail.com",
          allowSpecialCharacters: false,
        }),
        phone: faker.phone.number(),
        subject: faker.lorem.sentence({ min: 3, max: 8 }),
        comment: faker.lorem.sentences({ min: 1, max: 3 }),
        archived: faker.datatype.boolean(),
      };

      contacts.push(contactData);
    }

    await Contacts.insertMany(contacts);
    console.log("Contacts seeded! :)");

    const users: UserInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const userData: UserInterface = {
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        position: faker.helpers.arrayElement([
          "Room Service",
          "Receptionist",
          "Manager",
        ]),
        email: faker.internet.email({
          provider: "mirandahotel.com",
          allowSpecialCharacters: false,
        }),
        password: faker.internet.password({ length: 20 }),
        start_date: faker.date
          .between({ from: "2023-11-01", to: "2023-12-31" })
          .toString(),
        job_description: faker.person.jobTitle(),
        contact: faker.phone.number(),
        activity: faker.helpers.arrayElement(["active", "inactive"]),
      };

      users.push(userData);
    }

    await Users.insertMany(users);
    console.log("Users seeded! :)");
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    setTimeout(() => {
      mongoose.disconnect();
    }, 2000);
  }
}

seedDatabase();
