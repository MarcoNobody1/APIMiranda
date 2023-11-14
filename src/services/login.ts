import jwt from "jsonwebtoken";
import "dotenv/config";
import { Users } from "../models/Users.model";

const secretToken: string = process.env.SECRET_KEY || "";

async function login(username: string, password: string) {
  const result = await Users.findOne({ username: username });

  if (!result) throw new Error("Username or Password Incorrect!");
  const email: string = result.email;

  return signJWT({ username, email });
}

function signJWT(payload: { username: string; email: string }) {
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
