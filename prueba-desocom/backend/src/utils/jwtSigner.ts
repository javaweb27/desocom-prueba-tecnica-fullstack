import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

export const jwtSigner = async <T extends Record<string, unknown>>(
  data: T
): Promise<string> => {
  return jwt.sign(
    data,
    JWT_KEY
    // { expiresIn: "300s" }
  );
};
