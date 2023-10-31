import mongoose from "mongoose";
const { Schema } = mongoose;
import { ContactInterface } from "../interfaces/Contacts";

const contactsSchema = new Schema<ContactInterface>({
  date: {
    id: { type: String, required: true },
    send_date: { type: String, required: true },
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  subject: { type: String, required: true },
  comment: { type: String, required: true },
  archived: { type: Boolean, required: true },
});

export const Contacts = mongoose.model<ContactInterface>(
  "Contacts",
  contactsSchema
);
