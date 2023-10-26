import { Request, Response, Router } from "express";
import { ContactInterface } from "../models/Contacts";
import { contactService } from "../services/contacts";

export const contactsController = Router();   

contactsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await contactService.getAllContacts();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error al obtener los mensajes.");
  }
});

contactsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await contactService.getOneContact(parseInt(req.params.id));
        res.send(result);

    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

contactsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await contactService.delete(parseInt(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

contactsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await contactService.updateContact(parseInt(req.params.id), req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  }
);

contactsController.post("/", async (req: Request<ContactInterface>, res: Response) => {
    try {
      const result = await contactService.postNewContact(req.body);
      res.status(200).send(`Your contact is number ${result}`);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
);