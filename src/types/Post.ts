import { Schema, Types } from "mongoose";

interface Post {
  id: Types.ObjectId;
  postBody: string;
  username: string;
  createdAt: string;
  comments: [
    {
      commentBody: string;
      username: string;
      createdAt: string;
    }
  ];
  likes: [
    {
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
