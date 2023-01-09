import { model, Schema } from "mongoose";
import { DocumentResult } from "../graphql/resolvers/posts";
import Post from "../types/Post";

interface PostModel extends Post, Document, DocumentResult<Post> {}

const postSchema = new Schema({
  postBody: String!,
  username: String!,
  createdAt: String!,
  comments: [
    {
      commentBody: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default model<PostModel>("Post", postSchema);
