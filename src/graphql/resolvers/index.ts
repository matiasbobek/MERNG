import postsResolvers from "./posts";
import usersResolvers from "./users";

export const resolvers = {
  Query: {
    ...postsResolvers,
  },
  Mutation: {
    ...usersResolvers,
  },
};
