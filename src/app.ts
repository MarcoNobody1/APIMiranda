import express, { Express } from "express";
import cors from "cors";
import { bookingsController } from "./controllers/bookings";
import { roomsController } from "./controllers/rooms";
import { loginController } from "./controllers/login";
import authMiddleware from "./middleware/auth";
import { contactsController } from "./controllers/contacts";
import { usersController } from "./controllers/users";
import { infoController } from "./controllers/info";

export const app: Express = express();

app.use(cors());
app.use(express.json());

// public routes & middleware
app.use("/", infoController);
app.use("/login", loginController);
app.use(authMiddleware);

// private routes
app.use("/bookings", bookingsController);
app.use("/rooms", roomsController);
app.use("/users", usersController);
app.use("/contacts", contactsController);
