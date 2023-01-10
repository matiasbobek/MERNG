import { AuthenticationError, UserInputError } from "apollo-server";
import {
  validateCommentCreationInput,
  validateCommentDeletionInput,
} from "../../util/validators";
import { UserRequestContext } from "./users";

import PostModel from "../../models/Post";
import Post from "../../types/Post";
import checkAuthentication from "../../util/checkAuthentication";
import { Comment } from "../../types/Comment";

interface CreateCommentInputData {
  postId: string;
  commentBody: string;
}

interface DeleteCommentInputData {
  postId: string;
  commentId: string;
}

const commentResolvers = {
  Mutation: {
    async createComment(
      _: any,
      { postId, commentBody }: CreateCommentInputData,
      context: UserRequestContext
    ): Promise<Post> {
      const { valid, errors } = validateCommentCreationInput(
        postId,
        commentBody
      );

      if (!valid) {
        throw new UserInputError("Empty parameters", { errors });
      }
      const { username } = checkAuthentication(context);

      const post = await PostModel.findById(postId);

      if (!post) {
        errors.general = "Post not found";
        throw new UserInputError("Post not found", { errors });
      }

      const newComment: Comment = {
        commentBody,
        username,
        createdAt: new Date().toISOString(),
      };

      post.comments.unshift(newComment);

      const newPost = await post.save();

      return newPost;
    },
    async deleteComment(
      _: any,
      { postId, commentId }: DeleteCommentInputData,
      context: UserRequestContext
    ): Promise<Post> {
      const { valid, errors } = validateCommentDeletionInput(postId, commentId);

      if (!valid) {
        throw new UserInputError("Empty parameters", { errors });
      }

      const { username } = checkAuthentication(context);

      const post = await PostModel.findById(postId);

      if (!post) {
        errors.general = "Post not found";
        throw new UserInputError("Post not found", { errors });
      }

      const commentIndex = post.comments.findIndex(
        (comment) => comment.id!.toString() == commentId
      );

      if (commentIndex === -1) {
        errors.general = "Comment not found";
        throw new UserInputError("No comments found with that ID", { errors });
      } else if (post.comments[commentIndex].username !== username) {
        throw new AuthenticationError(
          "Action not allowed. Logged user don/'t match with comment user"
        );
      }

      post.comments.splice(commentIndex, 1);
      const newPost = await post.save();

      return newPost;
    },
  },
};
export default commentResolvers;
