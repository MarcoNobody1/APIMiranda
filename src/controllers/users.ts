import { Request, Response, Router } from "express";
import { UserInterface } from "../models/Users";
import { userService } from "../services/users";

export const usersController = Router();   

usersController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.send(result);
  } catch (error) {
    res.status(500).json("Error al obtener los mensajes.");
  }
});

usersController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await userService.getOneUser(req.params.id);
        res.send(result);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await userService.delete(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await userService.updateUser(req.params.id, req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

usersController.post("/", async (req: Request<UserInterface>, res: Response) => {
    try {
      const result = await userService.postNewUser(req.body);
      res.status(200).json(`Your user is number ${result}`);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);