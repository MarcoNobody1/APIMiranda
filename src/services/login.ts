import jwt from "jsonwebtoken";
import "dotenv/config";
import { Users } from "../models/Users.model";

const secretToken: string = process.env.SECRET_KEY || "";

async function login(username: string, password: string) {
console.log(username)
  const result = await Users.findOne({ username: username });
  console.log(result);
  if (!result) throw new Error("Username or Password Incorrect!");

  return signJWT({ username });
}

function signJWT(payload: { username: string }) {
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
