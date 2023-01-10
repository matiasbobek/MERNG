import { AuthenticationError, UserInputError } from "apollo-server";
import { Request } from "express";

import PostModel from "../../models/Post";
import Post from "../../types/Post";
import {
  validatePostId,
  validatePostCreationInput,
} from "../../util/validators";
import checkAuthentication from "../../util/checkAuthentication";
import { UserRequestContext } from "./users";

interface PostIDInput {
  postId: string;
}

interface CreatePostInput {
  postBody: string;
}

// For the mongoose response when creating a model instance
export interface DocumentResult<T> {
  _doc: T;
}

const Query = {
  async getPosts(): Promise<Array<Post>> {
    try {
      const posts = await PostModel.find().sort({ createdAt: -1 });
      return posts;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async getPost(_: any, { postId }: PostIDInput): Promise<Post> {
    const { errors, valid } = validatePostId(postId);

    if (!valid) {
      throw new UserInputError("Invalid Id", {
        errors,
      });
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      errors.general = "Post not found";
      throw new UserInputError("Post not found", { errors });
    }

    return {
      ...post._doc,
      id: post.id,
    };
  },
};

//The protected methods (only logged user) requires an apollo user context sended by the client in the req header
const Mutation = {
  async createPost(
    _: any,
    { postBody }: CreatePostInput,
    context: UserRequestContext
  ): Promise<Post> {
    const { errors, valid } = validatePostCreationInput(postBody);

    if (!valid) {
      throw new UserInputError("Post body must not be empty", {
        errors,
      });
    }

    const user = checkAuthentication(context);

    const newPost = new PostModel({
      postBody,
      user: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
    });

    const result = await newPost.save();

    return {
      ...result._doc,
      id: result._id,
    };
  },
  async deletePost(
    _: any,
    { postId }: PostIDInput,
    context: UserRequestContext
  ): Promise<string> {
    const user = checkAuthentication(context);

    const { errors, valid } = validatePostId(postId);

    if (!valid) {
      throw new UserInputError("Post id must not be empty", {
        errors,
      });
    }
    const post = await PostModel.findById(postId);

    if (!post) {
      errors.general = "Post not found";
      throw new UserInputError("Post not found", { errors });
    }

    if (user.username === post.username) {
      await post.delete();
      return "Post deleted succesfully";
    } else {
      throw new AuthenticationError("This username can/'t delete this post");
    }
  },

  async toggleLikePost(
    _: any,
    { postId }: PostIDInput,
    context: UserRequestContext
  ) {
    const user = checkAuthentication(context);

    const { errors, valid } = validatePostId(postId);

    if (!valid) {
      throw new UserInputError("Post id must not be empty", {
        errors,
      });
    }
    const post = await PostModel.findById(postId);

    if (!post) {
      errors.general = "Post not found";
      throw new UserInputError("Post not found", { errors });
    }

    const likeIndex = post.likes.findIndex(
      (like) => like.username == user.username
    );

    if (likeIndex === -1) {
      post.likes.unshift({
        username: user.username,
        createdAt: new Date().toISOString(),
      });
    } else {
      post.likes.splice(likeIndex, 1);
    }

    const newPost = await post.save();
    return newPost;
  },
};

export default { Query, Mutation };
