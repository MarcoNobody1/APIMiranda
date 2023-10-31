import { Request, Response, Router } from "express";
import { BookingInterface } from "../interfaces/Bookings";
import { Bookings } from "../models/bookings";

export const bookingsController = Router();   

bookingsController.get("/", async (_req: Request, res: Response) => {
  try {
    const bookings = await Bookings.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({error: true, message:"Error al obtener las reservas."});
  }
});

bookingsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const booking = await Bookings.findById(parseInt(req.params.id));
        res.json(booking);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await Bookings.findByIdAndDelete(parseInt(req.params.id));
      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const updated = await Bookings.findOneAndUpdate({id: parseInt(req.params.id)}, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

bookingsController.post("/", async (req: Request<BookingInterface>, res: Response) => {
    try {
      const added = await Bookings.create(req.body);
      res.status(200).json(added);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);