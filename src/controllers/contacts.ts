import { Request, Response, Router } from "express";
import { ContactInterface } from "../interfaces/Contacts";
import { contactService } from "../services/contacts";

export const contactsController = Router();   

contactsController.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await contactService.getAllContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({error: true, message: "Error al obtener los mensajes."});
  }
});

contactsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await contactService.getOneContact(parseInt(req.params.id));
        res.json(result);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const result = await contactService.delete(parseInt(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const result = await contactService.updateContact(parseInt(req.params.id), req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.post("/", async (req: Request<ContactInterface>, res: Response) => {
    try {
      const result = await contactService.postNewContact(req.body);
      res.status(200).json(`Your contact is number ${result}`);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);