import PostModel from "../../models/Post";
import Post from "../../types/Post";

const Query = {
  async getPosts(): Promise<Array<Post>> {
    try {
      const posts = await PostModel.find();
      console.log(posts);
      return posts;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default Query;
