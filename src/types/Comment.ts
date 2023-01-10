import { Types } from "mongoose";

export interface Comment {
  id?: Types.ObjectId;
  commentBody: string;
  username: string;
  createdAt: string;
}
