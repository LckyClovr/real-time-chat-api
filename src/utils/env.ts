import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT + "";
export const JWT_SECRET = process.env.JWT_SECRET + "";

export function init() {
  if (PORT.length === 0) throw new Error("PORT is not set");
  if (JWT_SECRET.length === 0) throw new Error("JWT_SECRET is not set");
}
