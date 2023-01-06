import { Types } from "mongoose";

interface User {
  id: Types.ObjectId;
  username: string;
  email: string;
  token: string;
  createdAt: string;
  password: string;
}

export default User;
