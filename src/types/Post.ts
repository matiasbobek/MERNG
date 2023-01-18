import { Schema, Types } from "mongoose";

import { Comment } from "./Comment";
import { Like } from "./Like";

interface Post {
  id: Types.ObjectId;
  postBody: string;
  username: string;
  createdAt: string;
  comments: Comment[];
  commentsCount?: number;
  likes: Like[];
  likesCount: number;
  user: {
    type: Schema.Types.ObjectId;
    ref: "users";
  };
}

export default Post;
