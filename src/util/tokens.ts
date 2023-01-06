import jwt from "jsonwebtoken";
import User from "../types/User";
import config from "../../config";

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    config.SECRET_JWT_KEY,
    { expiresIn: "1h" }
  );
}
