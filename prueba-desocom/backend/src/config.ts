import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/desocom-backend";
export const PORT = process.env.PORT || "3060";

export const JWT_KEY = process.env.JWT_KEY || "secret-key";
