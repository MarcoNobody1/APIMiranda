import { Request, Response, Router } from "express";
import { RoomInterface } from "../models/Rooms";
import { roomService } from "../services/rooms";

export const roomsController = Router();   

roomsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await roomService.getAllrooms();
    res.json(result);
  } catch (error) {
    res.status(500).json({error: true, message: "Error al obtener las reservas."});
  }
});

roomsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await roomService.getOneRoom(req.params.id);
        res.json(result);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await roomService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await roomService.updateRoom(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.post("/", async (req: Request<RoomInterface>, res: Response) => {
    try {
      const result = await roomService.postNewRoom(req.body);
      res.status(200).json(`Your Room is number ${result}`);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);