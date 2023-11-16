import mongoose from "mongoose";
const { Schema } = mongoose;
import { UserInterface } from "../interfaces/Users";

const usersSchema = new Schema<UserInterface>({
  avatar: { type: String, required: true },
  username: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  start_date: { type: String, required: true },
  job_description: { type: String, required: true },
  contact: { type: String, required: true },
  activity: { type: String, required: true },
});

export const Users = mongoose.model<UserInterface>("Users", usersSchema);
