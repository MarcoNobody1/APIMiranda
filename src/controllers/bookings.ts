import { Request, Response, Router } from "express";
import { BookingInterface } from "../interfaces/Bookings";
import { bookingService } from "../services/bookings";

export const bookingsController = Router();   

bookingsController.get("/", async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json(`${error}`);
  }
});

bookingsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const booking = await bookingService.getOneBooking(req.params.id);
        res.json(booking);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.get("/search/:refnumb", async (req: Request, res: Response) => {
    try {
      const booking = await bookingService.getOneByRef(req.params.refnumb);
        res.json(booking);
        
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await bookingService.delete(req.params.id);
      res.json(deleted);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const updated = await bookingService.updateBooking(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.post("/", async (req: Request<BookingInterface>, res: Response) => {
    try {
      const added = await bookingService.postNewBooking(req.body);
      res.json(added);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);