import supertest from "supertest";
import { app } from "../app";

describe("Login Testing", () => {
  it("should login", async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("payload");
    expect(res.body).toHaveProperty("token");
  });
  it("should not login", async () => {
    const res = await supertest(app).post("/login").send({
      user: "marco",
      password: "1234",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Error: Username or Password Incorrect!");
  });
  it("can't go to another route without login ", async () => {
    const res = await supertest(app).get("/bookings");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual( "You're not authorized!");
  });
});

describe("Info Testing", () => {
  it("should show info in info route", async () => {
    const res = await supertest(app).get("/")
    expect(res.statusCode).toEqual(200);
    console.log(res.body)
    expect(res.body).toHaveProperty("endpoints");
  });
});

describe("Bookings Testing", () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    authToken = res.body.token;
  });

  it("should enter Bookings", async () => {
    const res = await supertest(app).get("/bookings").set("token", authToken);
    expect(res.statusCode).toEqual(200);
  });

  it("should return all bookings with GET method", async () => {
    const res = await supertest(app).get("/bookings").set("token", authToken);

    expect(res.body[0]).toHaveProperty("special_request");
  });

  it("should add one booking with POST method", async () => {
    const res1 = await supertest(app).get("/bookings").set("token", authToken);

    const initialLength = res1.body.length;

    const res = await supertest(app)
      .post("/bookings")
      .set("token", authToken)
      .send({
        guest: {
          nombre: "Marco",
          apellidos: "Antonio",
          id_reserva: "15689",
        },
        order_date: "2023-12-13",
        check_in: "2023-12-25",
        check_out: "2023-12-31",
        special_request: "Maldita sea soy el mejor",
        room: {
          room_type: "Suite",
          room_number: "130",
          price: 50,
          amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
          room_description: "This is a new room",
        },
        status: "Check In",
      });

    expect(res.body).toEqual(`Your booking is number ${initialLength + 1}`);
  });

  it("should return one booking with GET method", async () => {
    const res = await supertest(app)
      .get("/bookings/98765")
      .set("token", authToken);

    expect(res.body[0].guest.id_reserva).toEqual("98765");
  });

  it("should return deleted booking with DELETE method", async () => {
    const res = await supertest(app)
      .delete("/bookings/24680")
      .set("token", authToken);

    expect(res.body[0].guest.id_reserva).toEqual("24680");
  });

  it("should return updated booking with PUT method", async () => {
    const prev_res = await supertest(app)
      .get("/bookings/98765")
      .set("token", authToken);

    const prev_description = prev_res.body[0].room.room_description;

    const res = await supertest(app)
      .put("/bookings/98765")
      .set("token", authToken)
      .send({
        guest: {
          nombre: "Marco",
          apellidos: "Antonio",
          id_reserva: "98765",
        },
        order_date: "2023-12-13",
        check_in: "2023-12-25",
        check_out: "2023-12-31",
        special_request: "Maldita sea soy el mejor",
        room: {
          room_type: "Suite",
          room_number: "130",
          price: 50,
          amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
          room_description: "This is a modified room",
        },
        status: "Check In",
      });

    const new_description = res.body[0].room.room_description;

    expect(prev_description).not.toEqual(new_description);
    expect(res.body[0].room.room_description).toEqual(
      "This is a modified room"
    );
  });
});

describe("Rooms Testing", () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    authToken = res.body.token;
  });

  it("should enter Rooms", async () => {
    const res = await supertest(app).get("/rooms").set("token", authToken);
    expect(res.statusCode).toEqual(200);
  });

  it("should return all rooms with GET method", async () => {
    const res = await supertest(app).get("/rooms").set("token", authToken);

    expect(res.body[0]).toHaveProperty("offer_price");
  });

  it("should add one room with POST method", async () => {
    const res1 = await supertest(app).get("/rooms").set("token", authToken);

    const initialLength = res1.body.length;

    const res = await supertest(app)
      .post("/rooms")
      .set("token", authToken)
      .send({
        room_name: {
          id: "1ABCD123",
          room_photo:
            "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
          room_number: 13131,
          room_description: "This is a NEW ROOM",
        },
        room_type: "Suite",
        amenities: [
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
        price: 250,
        offer_price: {
          isOffer: true,
          discount: 10,
        },
        availability: "available",
      });

    expect(res.body).toEqual(`Your Room is number ${initialLength + 1}`);
  });

  it("should return one room with GET method", async () => {
    const res = await supertest(app)
      .get("/rooms/1ABCD123")
      .set("token", authToken);

    expect(res.body[0].room_name.id).toEqual("1ABCD123");
  });

  it("should return deleted room with DELETE method", async () => {
    const res = await supertest(app)
      .delete("/rooms/2EFGH456")
      .set("token", authToken);

    expect(res.body[0].room_name.id).toEqual("2EFGH456");
  });

  it("should return updated room with PUT method", async () => {
    const prev_res = await supertest(app)
      .get("/rooms/1ABCD123")
      .set("token", authToken);

    const prev_description = prev_res.body[0].room_name.room_description;

    const res = await supertest(app)
      .put("/rooms/1ABCD123")
      .set("token", authToken)
      .send({
        room_name: {
          id: "1ABCD123",
          room_photo: "test.jpg",
          room_number: 13,
          room_description: "This is a modified room",
        },
        room_type: "Double Superior",
        amenities: [
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
        price: 250,
        offer_price: {
          isOffer: true,
          discount: 10,
        },
        availability: "available",
      });

    const new_description = res.body[0].room_name.room_description;

    expect(prev_description).not.toEqual(new_description);
    expect(res.body[0].room_name.room_description).toEqual(
      "This is a modified room"
    );
  });
});

describe("Contacts Testing", () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    authToken = res.body.token;
  });

  it("should enter Contacts", async () => {
    const res = await supertest(app).get("/contacts").set("token", authToken);
    expect(res.statusCode).toEqual(200);
  });

  it("should return all contacts with GET method", async () => {
    const res = await supertest(app).get("/contacts").set("token", authToken);

    expect(res.body[0]).toHaveProperty("comment");
  });

  it("should add one contact with POST method", async () => {
    const res1 = await supertest(app).get("/contacts").set("token", authToken);

    const initialLength = res1.body.length;

    const res = await supertest(app)
      .post("/contacts")
      .set("token", authToken)
      .send({
        date: {
          id: "94655",
          send_date: "2023-01-16",
        },
        customer: {
          name: "Angel Samuel",
          email: "angel@samuel.com",
          phone: "62457895332",
        },
        subject: "New Contact",
        comment: "This is a NEW contact",
        archived: true,
      });

    expect(res.body).toEqual(`Your contact is number ${initialLength + 1}`);
  });

  it("should return one contact with GET method", async () => {
    const res = await supertest(app)
      .get("/contacts/12345")
      .set("token", authToken);

    expect(res.body[0].date.id).toEqual("12345");
  });

  it("should return deleted booking with DELETE method", async () => {
    const res = await supertest(app)
      .delete("/contacts/67890")
      .set("token", authToken);

    expect(res.body[0].date.id).toEqual("67890");
  });

  it("should return updated room with PUT method", async () => {
    const prev_res = await supertest(app)
      .get("/contacts/12345")
      .set("token", authToken);

    const prev_comment = prev_res.body[0].comment;

    const res = await supertest(app)
      .put("/contacts/12345")
      .set("token", authToken)
      .send({
        date: {
          id: "12345",
          send_date: "2023-01-16",
        },
        customer: {
          name: "Angel Samuel",
          email: "angel@samuel.com",
          phone: "62457895332",
        },
        subject: "Updated Contact",
        comment: "This is a modified contact",
        archived: true,
      });

    const new_comment = res.body[0].comment;

    expect(prev_comment).not.toEqual(new_comment);
    expect(res.body[0].comment).toEqual("This is a modified contact");
  });
});

describe("Users Testing", () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    authToken = res.body.token;
  });

  it("should enter users", async () => {
    const res = await supertest(app).get("/users").set("token", authToken);
    expect(res.statusCode).toEqual(200);
  });

  it("should return all users with GET method", async () => {
    const res = await supertest(app).get("/users").set("token", authToken);

    expect(res.body[0]).toHaveProperty("job_description");
  });

  it("should add one contact with POST method", async () => {
    const res1 = await supertest(app).get("/users").set("token", authToken);

    const initialLength = res1.body.length;

    const res = await supertest(app)
      .post("/users")
      .set("token", authToken)
      .send({
        name: {
          photo: "https://robohash.org/employee1?set=set3.jpg",
          username: "Angel Samuel",
          id: "121dfeifnIF",
          employee_position: "Manager",
          email: "thisIsA@NewUser.com",
          password_hash: "IDontLikeThis",
        },
        start_date: "2023-01-15",
        job_description:
          "General hotel management, staff supervision, strategic decision-making.",
        contact: "+1234567890",
        activity: "active",
      });

    expect(res.body).toEqual(`Your user is number ${initialLength + 1}`);
  });

  it("should return one contact with GET method", async () => {
    const res = await supertest(app)
      .get("/users/121dfeifnIF")
      .set("token", authToken);

    expect(res.body[0].name.id).toEqual("121dfeifnIF");
  });

  it("should return deleted booking with DELETE method", async () => {
    const res = await supertest(app)
      .delete("/users/2abCdeFgH")
      .set("token", authToken);

    expect(res.body[0].name.id).toEqual("2abCdeFgH");
  });

  it("should return updated room with PUT method", async () => {
    const prev_res = await supertest(app)
      .get("/users/121dfeifnIF")
      .set("token", authToken);

    const prev_email = prev_res.body[0].name.email;

    const res = await supertest(app)
      .put("/users/121dfeifnIF")
      .set("token", authToken)
      .send({
        name: {
          photo: "https://robohash.org/employee1?set=set3.jpg",
          username: "Juan Rodriguez",
          id: "121dfeifnIF",
          employee_position: "Manager",
          email: "thisIsA@UpdatedUser.com",
          password_hash: "ILoveProgramming",
        },
        start_date: "2023-01-15",
        job_description:
          "General hotel management, staff supervision, strategic decision-making.",
        contact: "+1234567890",
        activity: "active",
      });

    const new_email = res.body[0].name.email;

    expect(prev_email).not.toEqual(new_email);
    expect(res.body[0].name.email).toEqual("thisIsA@UpdatedUser.com");
  });
});
