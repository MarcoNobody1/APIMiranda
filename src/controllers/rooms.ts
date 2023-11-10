import { Request, Response, Router } from "express";
import { RoomInterface } from "../interfaces/Rooms";
import { roomService } from "../services/rooms";
import { RoomSchema } from "../models/RoomSchema";
import { genValidationMiddleware } from "../middleware/validation";

export const roomsController = Router();   

roomsController.get("/", async (_req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json(`${error}`);
  }
});

roomsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const room = await roomService.getOneRoom(req.params.id);
        res.json(room);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await roomService.delete(req.params.id);
      res.json(deleted);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.put("/:id",genValidationMiddleware(RoomSchema), async (req: Request,res: Response) => {
    try {
      const updated = await roomService.updateRoom(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

roomsController.post("/",genValidationMiddleware(RoomSchema), async (req: Request<{}, RoomInterface>, res: Response) => {
    try {
      const added = await roomService.postNewRoom(req.body);
      res.json(added);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);