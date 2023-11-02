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
    expect(res.body.message).toEqual("You're not authorized!");
  });
});

describe("Info Testing", () => {
  it("should show info in info route", async () => {
    const res = await supertest(app).get("/");
    expect(res.statusCode).toEqual(200);
    console.log(res.body);
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
          id: "1234",
          room_type: "Suite",
          room_number: "130",
          price: 50,
          amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
          room_description: "This is a new booking",
        },
        status: "Check In",
      });

    expect(res.body).toHaveProperty("_id");
    expect(res.body.room.room_description).toEqual("This is a new booking");

    await supertest(app)
      .delete(`/bookings/${res.body._id}`)
      .set("token", authToken);
  });

  it("should return one booking with GET method", async () => {
    const res = await supertest(app)
      .get("/bookings/654353185dafd1d81bc0f014")
      .set("token", authToken);

    expect(res.body._id).toEqual("654353185dafd1d81bc0f014");
  });

  it("should return deleted booking with DELETE method", async () => {
    const res0 = await supertest(app)
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
        special_request: "This is a created and deleted booking",
        room: {
          id: "1234",
          room_type: "Suite",
          room_number: "130",
          price: 50,
          amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
          room_description: "This is a new booking",
        },
        status: "Check In",
      });

    const idToDelete = res0.body._id;

    const res = await supertest(app)
      .delete(`/bookings/${idToDelete}`)
      .set("token", authToken);

    expect(res.body._id).toEqual(idToDelete);
  });

  it("should return updated booking with PUT method", async () => {
    const randomNum = Math.floor(Math.random() * 25).toString();

    const res0 = await supertest(app)
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
      special_request: "This is a created and deleted booking",
      room: {
        id: "1234",
        room_type: "Suite",
        room_number: "130",
        price: 50,
        amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
        room_description: "This is a new booking",
      },
      status: "Check In",
    });

    const idToUpdate = res0.body._id;


    const prev_res = await supertest(app)
      .get(`/bookings/${idToUpdate}`)
      .set("token", authToken);

    const prev_id = prev_res.body.guest.id_reserva;

    const res = await supertest(app)
      .put(`/bookings/${idToUpdate}`)
      .set("token", authToken)
      .send({
        guest: {
          nombre: "Marco",
          apellidos: "Antonio",
          id_reserva: randomNum,
        },
        order_date: "2023-12-13",
        check_in: "2023-12-25",
        check_out: "2023-12-31",
        special_request: "Maldita sea soy el mejor",
        room: {
          id: "1234",
          room_type: "Suite",
          room_number: "130",
          price: 50,
          amenities: ["Free Wi-Fi", "Non-smoking room", "Ocean view"],
          room_description: "This is a modified room",
        },
        status: "Check In",
      });

    const new_id = res.body.guest.id_reserva;

    expect(prev_id).not.toEqual(new_id);
    expect(res.body.guest.id_reserva).toEqual(randomNum);

    await supertest(app)
      .delete(`/bookings/${idToUpdate}`)
      .set("token", authToken);
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

    expect(res.body).toHaveProperty("_id");
    expect(res.body.room_name.room_description).toEqual("This is a NEW ROOM");

    await supertest(app)
      .delete(`/rooms/${res.body._id}`)
      .set("token", authToken);
  });

  it("should return one room with GET method", async () => {
    const res = await supertest(app)
      .get("/rooms/654353185dafd1d81bc0f00a")
      .set("token", authToken);

    expect(res.body._id).toEqual("654353185dafd1d81bc0f00a");
  });

  it("should return deleted room with DELETE method", async () => {
    const res0 = await supertest(app)
      .post("/rooms")
      .set("token", authToken)
      .send({
        room_name: {
          id: "1ABCD123",
          room_photo: "example.jpg",
          room_number: 13131,
          room_description: "This is a created and deleted room",
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

    const idToDelete = res0.body._id;

    const res = await supertest(app)
      .delete(`/rooms/${idToDelete}`)
      .set("token", authToken);

    expect(res.body._id).toEqual(idToDelete);
  });

  it("should return updated room with PUT method", async () => {
    const randomNum = Math.floor(Math.random() * 25).toString();

    const res0 = await supertest(app)
      .post("/rooms")
      .set("token", authToken)
      .send({
        room_name: {
          id: "1ABCD123",
          room_photo: "example.jpg",
          room_number: 13131,
          room_description: "This is a created and deleted room",
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

    const idToUpdate = res0.body._id;


    const prev_res = await supertest(app)
      .get(`/rooms/${idToUpdate}`)
      .set("token", authToken);

    const prev_description = prev_res.body.room_name.room_description;

    const res = await supertest(app)
      .put(`/rooms/${idToUpdate}`)
      .set("token", authToken)
      .send({
        room_name: {
          id: "1ABCD123",
          room_photo: "test.jpg",
          room_number: 13,
          room_description: randomNum,
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

    const new_description = res.body.room_name.room_description;

    expect(prev_description).not.toEqual(new_description);
    expect(res.body.room_name.room_description).toEqual(randomNum);

    await supertest(app)
      .delete(`/rooms/${idToUpdate}`)
      .set("token", authToken);
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

    expect(res.body).toHaveProperty("_id");
    expect(res.body.comment).toEqual("This is a NEW contact");

    await supertest(app)
      .delete(`/contacts/${res.body._id}`)
      .set("token", authToken);
  });

  it("should return one contact with GET method", async () => {
    const res = await supertest(app)
      .get("/contacts/654353185dafd1d81bc0f01e")
      .set("token", authToken);

    expect(res.body._id).toEqual("654353185dafd1d81bc0f01e");
  });

  it("should return deleted contact with DELETE method", async () => {
    const res0 = await supertest(app)
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

    const idToDelete = res0.body._id;

    const res = await supertest(app)
      .delete(`/contacts/${idToDelete}`)
      .set("token", authToken);

    expect(res.body._id).toEqual(idToDelete);
  });

  it("should return updated contact with PUT method", async () => {

    const randomNum = Math.floor(Math.random() * 25).toString();

    const res0 = await supertest(app)
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

  const idToUpdate = res0.body._id;

    const prev_res = await supertest(app)
      .get(`/contacts/${idToUpdate}`)
      .set("token", authToken);

    const prev_comment = prev_res.body.comment;

    const res = await supertest(app)
      .put(`/contacts/${idToUpdate}`)
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
        comment: randomNum,
        archived: true,
      });

    const new_comment = res.body.comment;

    expect(prev_comment).not.toEqual(new_comment);
    expect(res.body.comment).toEqual(randomNum);

    await supertest(app)
      .delete(`/contacts/${idToUpdate}`)
      .set("token", authToken)
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

  it("should add one user with POST method", async () => {
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

    expect(res.body).toHaveProperty("_id");
    expect(res.body.name.email).toEqual("thisIsA@NewUser.com");

    await supertest(app)
    .delete(`/users/${res.body._id}`)
    .set("token", authToken);
  });

  it("should return one user with GET method", async () => {
    const res = await supertest(app)
      .get("/users/654353185dafd1d81bc0f028")
      .set("token", authToken);

    expect(res.body._id).toEqual("654353185dafd1d81bc0f028");
  });

  it("should return deleted user with DELETE method", async () => {

    const res0 = await supertest(app)
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

    const idToDelete = res0.body._id;

    const res = await supertest(app)
      .delete(`/users/${idToDelete}`)
      .set("token", authToken);

    expect(res.body._id).toEqual(idToDelete);
  });

  it("should return updated user with PUT method", async () => {

    const randomNum = Math.floor(Math.random() * 25).toString();

    const res0 = await supertest(app)
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

    const idToUpdate = res0.body._id;

    const prev_res = await supertest(app)
      .get(`/users/${idToUpdate}`)
      .set("token", authToken);

    const prev_email = prev_res.body.name.email;

    const res = await supertest(app)
      .put(`/users/${idToUpdate}`)
      .set("token", authToken)
      .send({
        name: {
          photo: "https://robohash.org/employee1?set=set3.jpg",
          username: "Juan Rodriguez",
          id: "121dfeifnIF",
          employee_position: "Manager",
          email: randomNum,
          password_hash: "ILoveProgramming",
        },
        start_date: "2023-01-15",
        job_description:
          "General hotel management, staff supervision, strategic decision-making.",
        contact: "+1234567890",
        activity: "active",
      });

    const new_email = res.body.name.email;

    expect(prev_email).not.toEqual(new_email);
    expect(res.body.name.email).toEqual(randomNum);

    await supertest(app)
      .delete(`/users/${idToUpdate}`)
      .set("token", authToken);
  });
});
