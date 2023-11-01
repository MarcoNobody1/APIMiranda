import { faker } from "@faker-js/faker";
import { BookingInterface } from "./src/interfaces/Bookings";
import { RoomInterface } from "./src/interfaces/Rooms";
import { ContactInterface } from "./src/interfaces/Contacts";
import { UserInterface } from "./src/interfaces/Users";
import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const uri: string = process.env.ATLAS_SERVER || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const ITERATIONS: number = 10;

  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const roomCollection = client.db("MirandaAPIDatabase").collection("Rooms");

    const rooms: RoomInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const roomData: RoomInterface = {
        room_name: {
          id: faker.string.uuid(),
          room_photo: faker.image.urlPicsumPhotos(),
          room_number: faker.number.int({ min: 100, max: 300 }),
          room_description: faker.lorem.sentence({ min: 10, max: 40 }),
        },
        room_type: faker.helpers.arrayElement([
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
        offer_price: {
          isOffer: faker.datatype.boolean(),
          discount: Math.ceil(faker.number.int({ min: 5, max: 30 }) / 5) * 5,
        },
        availability: faker.helpers.arrayElement(["Available", "Booked"]),
      };

      rooms.push(roomData);
    }

    roomCollection.insertMany(rooms);

    console.log("Rooms seeded! :)");

    const bookingCollection = client
      .db("MirandaAPIDatabase")
      .collection("Bookings");

    const bookings: BookingInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const index = Math.floor(Math.random() * ITERATIONS);
      const room = rooms[index];
      const orderDate = faker.date.between({ from: "2020-01-01", to: "2020-02-01" });
      const checkIn= faker.date.between({ from: "2020-03-01", to: "2020-03-31" });
      const checkOut = faker.date.between({ from: "2020-04-01", to: "2020-04-30" });

      const bookingData: BookingInterface = {
        guest: {
          nombre: faker.person.firstName(),
          apellidos: faker.person.lastName(),
          id_reserva: faker.string.uuid(),
        },
        order_date: `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}-${String(orderDate.getDate()).padStart(2, '0')}`,
        check_in: `${checkIn.getFullYear()}-${String(checkIn.getMonth() + 1).padStart(2, '0')}-${String(checkIn.getDate()).padStart(2, '0')}`,
        check_out: `${checkOut.getFullYear()}-${String(checkOut.getMonth() + 1).padStart(2, '0')}-${String(checkOut.getDate()).padStart(2, '0')}`,
        special_request: faker.lorem.sentence({ min: 7, max: 25 }),
        room: {
          id: room.room_name.id,
          room_type: room.room_type,
          room_number: room.room_name.room_number.toString(),
          price: room.price,
          amenities: room.amenities,
          room_description: room.room_name.room_description,
        },
        status: faker.helpers.arrayElement([
          "Check In",
          "Check Out",
          "In Progress",
        ]),
      };

      bookings.push(bookingData);
    }

    bookingCollection.insertMany(bookings);
    console.log("Bookings seeded! :)");

    const contactCollection = client
      .db("MirandaAPIDatabase")
      .collection("Contacts");

    const contacts: ContactInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const sendDate = faker.date.between({ from: "2020-01-01", to: "2021-01-01" });

      const contactData: ContactInterface = {
        date: {
          id: faker.string.uuid(),
          send_date: `${sendDate.getFullYear()}-${String(sendDate.getMonth() + 1).padStart(2, '0')}-${String(sendDate.getDate()).padStart(2, '0')}`,
        },
        customer: {
          name: faker.person.fullName(),
          email: faker.internet.email({
            provider: "anymail.com",
            allowSpecialCharacters: false,
          }),
          phone: faker.phone.number(),
        },
        subject: faker.lorem.sentence({ min: 3, max: 8 }),
        comment: faker.lorem.sentences({ min: 1, max: 3 }),
        archived: faker.datatype.boolean(),
      };

      contacts.push(contactData);
    }

    contactCollection.insertMany(contacts);
    console.log("Contacts seeded! :)");

    const userCollection = client.db("MirandaAPIDatabase").collection("Users");

    const users: UserInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const startDate = faker.date.between({ from: "2023-11-01", to: "2023-12-31" });

      const userData: UserInterface = {
        name: {
          photo: faker.image.avatar(),
          username: faker.internet.userName(),
          id: faker.string.uuid(),
          employee_position: faker.helpers.arrayElement([
            "Room Service",
            "Receptionist",
            "Manager",
          ]),
          email: faker.internet.email({
            provider: "mirandahotel.com",
            allowSpecialCharacters: false,
          }),
          password_hash: faker.internet.password({ length: 20 }),
        },
        start_date: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
        job_description: faker.person.jobTitle(),
        contact: faker.phone.number(),
        activity: faker.helpers.arrayElement(["active", "inactive"]),
      };

      users.push(userData);
    }

    userCollection.insertMany(users);
    console.log("Users seeded! :)");
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setTimeout(() => {
      client.close();
    }, 2000);
  }
}

run();
