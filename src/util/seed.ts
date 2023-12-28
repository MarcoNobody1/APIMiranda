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

    Bookings.collection.drop();
    Rooms.collection.drop();
    Contacts.collection.drop();
    Users.collection.drop();

    console.log("Collections dropped! :(");

    const rooms: RoomInterface[] = [];

    const roomDescriptions = [
      "Discover comfort and style in our thoughtfully designed rooms. Each room is a haven of relaxation, featuring modern decor, plush furnishings, and ample space to unwind. Enjoy the convenience of high-speed Wi-Fi, a flat-screen TV, and 24-hour room service. Your perfect retreat awaits.",

      "Experience luxury like never before in our upscale accommodations. Immerse yourself in opulence with premium amenities, sumptuous bedding, and elegant furnishings. Indulge in the breathtaking views from your private balcony. Every detail is meticulously crafted to ensure an unforgettable stay in pure sophistication.",

      "For those seeking a family-friendly retreat, our spacious rooms provide a warm and welcoming atmosphere for all. Thoughtfully designed with the whole family in mind, enjoy connecting rooms, kid-friendly amenities, and personalized service. Create cherished memories in a space that feels like home.",

      "Unwind in tranquility with our rooms offering scenic views of the surrounding beauty. Whether it's the city skyline or lush landscapes, our accommodations provide a front-row seat to the wonders outside your window. Revel in the serenity and let nature be your backdrop.",

      "Elevate your stay in our exclusive suites, where luxury meets functionality. Experience the epitome of elegance with a private living area, upscale furnishings, and personalized concierge service. Immerse yourself in sophistication and savor the unparalleled indulgence of our premium accommodations.",

      "Immerse yourself in the cozy ambiance of our well-appointed rooms. Designed for ultimate relaxation, each room is a retreat featuring modern amenities, a comfortable seating area, and soft lighting. Enjoy a restful night's sleep and wake up refreshed for a day of exploration and adventure.",

      "Feel at home in our pet-friendly rooms designed with both you and your furry companion in mind. Enjoy the convenience of pet amenities and a welcoming atmosphere. Embrace the joy of traveling with your pets and create lasting memories together in our comfortable accommodations.",

      "Embark on a romantic escape in our specially curated suites. The Honeymoon Suite is a haven for lovebirds, featuring intimate settings, a king-sized bed, and special touches for a romantic getaway. Create cherished moments in an ambiance designed for love and celebration.",

      "Experience inclusivity in our accessible rooms, where thoughtful design meets functionality. These rooms are equipped with accessibility features to ensure a comfortable stay for all guests. Enjoy the convenience of a well-designed space that caters to the needs of every traveler.",

      "Escape to our luxurious villas, secluded for your privacy and surrounded by lush landscapes. Indulge in the serenity of your private pool, unwind in the spacious living areas, and savor the unmatched tranquility of your own retreat. Your paradise awaits.",
    ];

    for (let i = 0; i < ITERATIONS; i++) {
      const roomData: RoomInterface = {
        photos: faker.helpers.arrayElements(
          [
            "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room1.jpeg",
            "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room2.jpeg",
            "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room3.jpeg",
            "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room4.jpeg",
            "https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/room5.jpeg",
          ],
          { min: 3, max: 3 }
        ),
        number: faker.number.int({ min: 100, max: 300 }),
        description: roomDescriptions[i],
        type: faker.helpers.arrayElement([
          "Single Room",
          "Double Room",
          "Double Superior",
          "Suite",
        ]),
        amenities: faker.helpers.arrayElement([
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
        price: faker.number.int({ min: 100, max: 300 }),
        discount: Math.ceil(faker.number.int({ min: 5, max: 30 }) / 5) * 5,
        availability: faker.helpers.arrayElement(["Available", "Booked"]),
      };

      rooms.push(roomData);
    }

    const insertedRooms = await Rooms.insertMany(rooms);

    console.log("Rooms seeded! :)");

    const bookings: BookingInterface[] = [];

    const specialRequests = [
      "Please arrange for a late check-in.",
      "Request a room with a city view.",
      "Require a crib for the infant.",
      "Prefer a non-smoking room, if possible.",
      "Need extra towels and toiletries.",
      "Please provide gluten-free breakfast options.",
      "Request a room away from the elevator.",
      "Require a vegetarian meal for breakfast.",
      "Please stock the minibar with healthy snacks.",
      "Request an early check-in if available.",
      "Need assistance with luggage to the room.",
      "Require a room with disability access.",
      "Please arrange for a floral room decoration.",
      "Request a king-sized bed if possible.",
      "Need recommendations for local dining options.",
    ];

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
        special_request: specialRequests[i],
        room_id: room._id,
        room_photos: room.photos,
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
        reference_number: faker.string.nanoid(5),
      };

      bookings.push(bookingData);
    }

    await Bookings.insertMany(bookings);
    console.log("Bookings seeded! :)");

    const contacts: ContactInterface[] = [];
    const subjects = [
      "Room Experience: Suggestions",
      "Exceptional Stay! Share Your Feedback",
      "Issue with Room Service",
      "Compliment or Concern?",
      "Feedback on Recent Stay?",
      "Unforgettable Stay & Share Your Review",
      "Problems During My Stay",
      "Your Stay Matters: Share Your Thoughts",
      "Room Service Concerns",
      "General Feedback and Suggestions",
    ];

    const comments = [
      `Dear Hotel Miranda, I recently stayed at your hotel and have a few suggestions to enhance the room experience. Your attention to these details would make future stays even more enjoyable. Thank you for your time!`,
      `Hello Hotel Miranda Team, I had an exceptional stay at your hotel! I wanted to express my gratitude for the outstanding service and comfort. Can't wait to return! Best regards.`,
      `Dear Hotel Miranda, Unfortunately, I encountered an issue with room service during my stay. Could you kindly address this matter and provide a resolution? Thank you for your prompt attention.`,
      `Hello Hotel Miranda Team, Whether you have a compliment or concern, we want to hear from you! Share your thoughts about your recent stay, so we can continue to improve our services. Thank you!`,
      `Dear Hotel Miranda, We hope you enjoyed your recent stay. We'd love to hear your thoughts and feedback. Please take a moment to share your experience. Your input is valuable to us.`,
      `Hello Hotel Miranda, We hope your stay was unforgettable! Share your review with us, detailing the highlights of your experience. Your insights can help us create more memorable stays.`,
      `Dear Hotel Miranda, I experienced problems during my stay and would like to bring them to your attention. Can we discuss a resolution to ensure a better experience for future guests?`,
      `Hello Hotel Miranda Guest, Your stay matters to us! Please take a moment to share your thoughts on your recent visit. Your feedback is crucial in helping us enhance our guest experience. Thank you!`,
      `Dear Hotel Miranda, I had concerns regarding room service during my stay. Could you please look into this matter? Your attention is appreciated. Thank you.`,
      `Hello Hotel Miranda Team, Your guests have some general feedback and suggestions to share. Please take a moment to review and consider these insights for the continuous improvement of Hotel Miranda's services. Thank you!`,
    ];

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
        subject: subjects[i],
        comment: comments[i],
        archived: faker.datatype.boolean(),
      };

      contacts.push(contactData);
    }

    await Contacts.insertMany(contacts);
    console.log("Contacts seeded! :)");

    const users: UserInterface[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
      const userData: UserInterface = {
        avatar: faker.image.avatarGitHub(),
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
