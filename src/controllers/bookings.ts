import { Request, Response, Router } from "express";
import { BookingInterface } from "../models/Bookings";
import bookingsData from "../data/Bookings.json";

export const bookingsController = Router();

bookingsController.get("/", (req: Request, res: Response) => {
  res.send(bookingsData);
});

bookingsController.get(
  "/:id",
  (req: Request<{ id: number }>, res: Response) => {
    const id = req.params.id.toString();
    const result = bookingsData.filter(
      (booking) => booking.guest.id_reserva === id
    );
    res.send(result);
  }
);

bookingsController.delete(
  "/:id",
  (req: Request<{ id: number }>, res: Response) => {
    const id = req.params.id.toString();
    const indexBooking = bookingsData.findIndex(
      (booking) => booking.guest.id_reserva === id
    );
    bookingsData.splice(indexBooking, 1);
    res.status(200).send(`Booking ${id} deleted`);
  }
);

bookingsController.put(
  "/:id",
  (req: Request<{ id: number; data: BookingInterface }>, res: Response) => {
    const id = req.params.id.toString();
    const selectedBooking = req.body.data;

    const bookingIndex = bookingsData.findIndex(
      (booking) => booking.guest.id_reserva === id
    );

    const modifiedBooking = (bookingsData[bookingIndex] = {
      ...bookingsData[bookingIndex],
      ...selectedBooking,
    });

    res.send(modifiedBooking);
  }
);

bookingsController.post("/", (req: Request<BookingInterface>, res: Response) => {
  const newBooking = req.body;
  bookingsData.push(newBooking);
  res.status(200).send(`Booking ${newBooking.guest.id_reserva} added`);
});
