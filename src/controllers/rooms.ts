import { Request, Response, Router } from "express";
import { RoomInterface } from "../models/Rooms";
import { RoomService } from "../services/rooms";

export const roomsController = Router();   

roomsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await RoomService.getAllrooms();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error al obtener las reservas.");
  }
});

roomsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await RoomService.getOneRoom(req.params.id);
        res.send(result);

    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

roomsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await RoomService.delete(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

roomsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await RoomService.updateRoom(req.params.id, req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

roomsController.post("/", async (req: Request<RoomInterface>, res: Response) => {
    try {
      const result = await RoomService.postNewRoom(req.body);
      res.status(200).send(`Your Room is number ${result}`);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
);