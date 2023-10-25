import { Request, Response, Router } from "express";
import { BookingInterface } from "../models/Bookings";
import { bookingService } from "../services/bookings";

export const bookingsController = Router();   

bookingsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookings();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error al obtener las reservas.");
  }
});

bookingsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getOneBooking(parseInt(req.params.id));
        res.send(result);

    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

bookingsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await bookingService.delete(parseInt(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

bookingsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await bookingService.updateBooking(parseInt(req.params.id), req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

bookingsController.post("/", async (req: Request<BookingInterface>, res: Response) => {
    try {
      const result = await bookingService.postNewBooking(req.body);
      res.status(200).send(`Your booking is number ${result}`);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
);