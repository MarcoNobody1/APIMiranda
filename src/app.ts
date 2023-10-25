import express, { Express, Request, Response } from "express";
import cors from 'cors'
import { bookingsController } from "./controllers/bookings";
import { roomsController } from "./controllers/rooms";

export const app = express()

// middlewares
app.use(cors())
app.use(express.json())



// public routes
// app.use('/login', loginController)

// private routes
app.use('/bookings', bookingsController)    
app.use('/rooms', roomsController)   
// app.use('/users', usersController)  
// app.use('/contacts', contactsController)    