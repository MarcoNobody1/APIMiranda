import jwt from "jsonwebtoken";
import "dotenv/config";

const defaultUser = {
  user: "admin",
  password: "admin",
};

const secretToken: string = process.env.SECRET_KEY|| "";

async function login(user: string, password: string) {
  if (defaultUser.user !== user || defaultUser.password !== password) {
    throw new Error("Username or Password Incorrect!");
  }
  return await signJWT({ user });
}

function signJWT(payload: { user: string }) {
  const token = jwt.sign(payload, secretToken, { expiresIn: "1h" });
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
