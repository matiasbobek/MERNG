import { model, Schema } from "mongoose";
import { DocumentResult } from "../graphql/resolvers/users";
import User from "../types/User";

interface UserModel extends User, Document, DocumentResult<User> {}

const userSchema = new Schema({
  username: String!,
  password: String!,
  email: String!,
  createdAt: String!,
});

export default model<UserModel>("User", userSchema);
