import { Request, Response, Router } from "express";
import { sendEmailService } from "../services/email";

export const emailController = Router();

emailController.post("/", async (req: Request, res: Response) => {
  try {
    const { subject, text } = req.body;
    await sendEmailService.sendEmail(subject, text);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
