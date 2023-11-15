import jwt from "jsonwebtoken";
import "dotenv/config";
import { Users } from "../models/Users.model";
import bcrypt from "bcryptjs";

const secretToken: string = process.env.SECRET_KEY || "";

async function login(username: string, password: string) {
  const result = await Users.findOne({ username: username });

  if (!result) throw new Error("Not valid Username!");

  const email: string = result.email;
  const avatar: string = result.avatar;

  const passwordOk = await bcrypt.compare(password, result.password || "");

  if (!passwordOk)
    throw new Error("Something went wrong. Email or Password Incorrect.");

  return signJWT({ username, email, avatar });
}

function signJWT(payload: { username: string; email: string; avatar: string }) {
  const token = jwt.sign(payload, secretToken);
  return { payload, token };
}

function verifyJWT(token: string) {
  const payload = jwt.verify(token, secretToken);
  return payload;
}

const authService = {
  login,
  signJWT,
  verifyJWT,
};

export default authService;
