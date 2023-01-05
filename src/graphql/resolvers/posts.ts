import Post from "../../models/Post";

const Query = {
  async getPosts() {
    try {
      const posts = await Post.find();
      console.log(posts);
      return posts;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default Query;
