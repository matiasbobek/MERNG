import { Types } from "mongoose";

interface User {
  id: Types.ObjectId;
  email: string;
  token: string;
  username: string;
  createdAt: string;
}

export default User;
