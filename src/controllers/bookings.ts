import { Request, Response, Router } from "express";
import { BookingInterface } from "../interfaces/Bookings";
import { bookingService } from "../models/bookings";

export const bookingsController = Router();   

bookingsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookings();
    res.json(result);
  } catch (error) {
    res.status(500).json({error: true, message:"Error al obtener las reservas."});
  }
});

bookingsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getOneBooking(parseInt(req.params.id));
        res.json(result);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await bookingService.delete(parseInt(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await bookingService.updateBooking(parseInt(req.params.id), req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.post("/", async (req: Request<BookingInterface>, res: Response) => {
    try {
      const result = await bookingService.postNewBooking(req.body);
      res.status(200).json(`Your booking is number ${result}`);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);