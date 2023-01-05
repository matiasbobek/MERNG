import { Schema } from "mongoose";

interface Post {
  body: string;
  username: string;
  createdAt: string;
  comments: [
    {
      body: string;
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
