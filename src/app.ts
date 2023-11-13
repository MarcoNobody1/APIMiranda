import express, { Express } from "express";
import cors from "cors";
import { bookingsController } from "./controllers/bookings";
import { roomsController } from "./controllers/rooms";
import { loginController } from "./controllers/login";
import authMiddleware from "./middleware/auth";
import { contactsController } from "./controllers/contacts";
import { usersController } from "./controllers/users";
import { ConnectToDatabase } from "./util/connect";
import { infoController } from "./controllers/info";

ConnectToDatabase();

export const app: Express = express();

app.use(
  cors({
    origin: [
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com",
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com/login",
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com/bookings",
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com/rooms",
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com/contacts",
      "https://7zclei7sla.execute-api.eu-west-1.amazonaws.com/users",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: "token",
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.end();
  next();
});

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
