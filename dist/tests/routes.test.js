"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe("Login Testing", () => {
    it("should login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            user: "admin",
            password: "admin",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("payload");
        expect(res.body).toHaveProperty("token");
    }));
    it("should not login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            user: "marco",
            password: "1234",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual("Error: Username or Password Incorrect!");
    }));
    it("can't go to another route without login ", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual("Error: You are not authorized.");
    }));
});
describe("Booking Testing", () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            user: "admin",
            password: "admin",
        });
        authToken = res.body.token;
    }));
    it("should enter Bookings", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it("should return all bookings with GET method", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.body[0]).toHaveProperty("special_request");
    }));
    it("should add one booking with POST method", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        const initialLength = res1.body.length;
        const res = yield (0, supertest_1.default)(app_1.app).post("/bookings").set("token", authToken).send({
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
    }));
    it("should return one booking with GET method", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings/98765").set("token", authToken);
        expect(res.body[0].guest.id_reserva).toEqual("98765");
    }));
    it("should return deleted booking with DELETE method", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).delete("/bookings/98765").set("token", authToken);
        expect(res.body[0].guest.id_reserva).toEqual("98765");
    }));
    it("should return updated booking with PUT method", () => __awaiter(void 0, void 0, void 0, function* () {
        const prev_res = yield (0, supertest_1.default)(app_1.app).get("/bookings/98765").set("token", authToken);
        const prev_description = prev_res.body[0].room.room_description;
        const res = yield (0, supertest_1.default)(app_1.app).put("/bookings/98765").set("token", authToken).send({
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
        expect(res.body[0].room.room_description).toEqual("This is a modified room");
    }));
});
