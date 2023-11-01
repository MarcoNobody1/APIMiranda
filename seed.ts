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


for (let i = 0; i < ITERATIONS; i++) {
    const index = Math.floor(Math.random() * ITERATIONS);
    const room = rooms[index];


  const bookingData: BookingInterface = {
    guest: {
      nombre: faker.person.firstName(),
      apellidos: faker.person.lastName(),
      id_reserva: faker.string.uuid(),
    },
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
    room: {
      id: room.room_name.id,
      room_type: room.room_type,
      room_number:  room.room_name.room_number.toString(),
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

  await Bookings.create(bookingData);
}

