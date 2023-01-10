import postsResolvers from "./posts";
import usersResolvers from "./users";
import commentResolvers from "./comments";

import Post from "../../types/Post";

export const resolvers = {
  Post: {
    likesCount(parent: Post): number {
      return parent.likes.length;
    },
    commentsCount(parent: Post): number {
      return parent.comments.length;
    },
  },

  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
