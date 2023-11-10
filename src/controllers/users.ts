import { Request, Response, Router } from "express";
import { UserInterface } from "../interfaces/Users";
import { userService } from "../services/users";
import { genValidationMiddleware } from "../middleware/validation";
import { RoomSchema } from "../schemas/RoomSchema";

export const usersController = Router();   

usersController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json(`${error}`);
  }
});

usersController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await userService.getOneUser(req.params.id);
        res.json(result);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await userService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.put("/:id", genValidationMiddleware(RoomSchema), async (req: Request,res: Response) => {
    try {
      const result = await userService.updateUser(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.post("/", genValidationMiddleware(RoomSchema), async (req: Request< {}, UserInterface>, res: Response) => {
    try {
      const result = await userService.postNewUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);