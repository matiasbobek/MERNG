import { gql } from "apollo-server";

export const typeDefs = gql`
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    commentBody: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Post {
    id: ID!
    postBody: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likesCount: Int!
    commentsCount: Int!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
  }

  type Mutation {
    register(inputData: RegisterInput): User!
    login(inputData: LoginInput): User!
    createPost(postBody: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, commentBody: String!): Post!
    deleteComment(postId: String!, commentId: ID!): Post!
    toggleLikePost(postId: String!): Post!
  }
`;
