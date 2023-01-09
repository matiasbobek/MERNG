import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

import config from "../../config";
import { UserRequestContext } from "../graphql/resolvers/posts";

interface JWTUser extends jwt.JwtPayload {
  username: string;
  id: string;
  email: string;
}

function chekAuth(context: UserRequestContext): JWTUser {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = <JWTUser>jwt.verify(token, config.SECRET_JWT_KEY);

        return user;
      } catch (errors) {
        throw new AuthenticationError("invalid/expired token", { errors });
      }
    } else {
      throw new AuthenticationError(
        "Authentication token must be 'Bearer [token]"
      );
    }
  } else {
    throw new AuthenticationError("Authentication header must be provided");
  }
}

export default chekAuth;
