import express, { Express, Request, Response } from "express";
import cors from 'cors'
import { bookingsController } from "./controllers/bookings";

export const app = express()

// middlewares
app.use(cors())
app.use(express.json())



// public routes
// app.use('/login', loginController)

// private routes
app.use('/bookings', bookingsController)