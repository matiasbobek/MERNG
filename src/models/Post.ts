import { model, Schema } from "mongoose";

//TODO: Es necesario usar schemas o puedo usar interfaces de TS?
const postSchema = new Schema({
  body: String!,
  username: String!,
  createdAt: String!,
  comments: [
    {
      body: String,
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

export default model("Post", postSchema);
