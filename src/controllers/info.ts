import { Request, Response, Router } from "express";
import infoJSON from "../data/Info.json";

export const infoController = Router();

infoController.get("/", async (_req: Request, res: Response) => {
  try {
    await res.json(infoJSON);
  } catch (error) {
    res.status(400).send("Error al obtener las información.");
  }
});
