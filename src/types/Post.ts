import { Schema, Types } from "mongoose";

import { Comment } from "./Comment";

interface Post {
  id: Types.ObjectId;
  postBody: string;
  username: string;
  createdAt: string;
  comments: Comment[];
  likes: [
    {
      id?: Types.ObjectId;
      username: string;
      createdAt: string;
    }
  ];
  user: {
    type: Schema.Types.ObjectId;
    ref: "users";
  };
}

export default Post;
