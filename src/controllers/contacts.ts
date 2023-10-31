import { Request, Response, Router } from "express";
import { ContactInterface } from "../interfaces/Contacts";
import { contactService } from "../services/contacts";

export const contactsController = Router();   

contactsController.get("/", async (_req: Request, res: Response) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json(`${error}`);
  }
});

contactsController.get("/:id", async (req: Request, res: Response) => {
    try {
      const contact = await contactService.getOneContact(req.params.id);
        res.json(contact);

    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.delete("/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await contactService.delete(req.params.id);
      res.json(deleted);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.put("/:id", async (req: Request,res: Response) => {
    try {
      const updated = await contactService.updateContact(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

contactsController.post("/", async (req: Request<ContactInterface>, res: Response) => {
    try {
      const added = await contactService.postNewContact(req.body);
      res.json(added);
    } catch (error) {
      res.status(500).json(`${error}`);
    }
  }
);