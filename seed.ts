import { Bookings } from "./src/models/Bookings.model";
import { Rooms } from "./src/models/Rooms.model";
import { Contacts } from "./src/models/Contacts.model";
import { Users } from "./src/models/Users.model";
import { faker } from "@faker-js/faker";
import { BookingInterface } from "./src/interfaces/Bookings";
import { RoomInterface } from "./src/interfaces/Rooms";

const ITERATIONS: number = 10;

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

  const room = await Rooms.create(roomData);

  rooms.push(room)

}