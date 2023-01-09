import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    postBody: String!
    username: String!
    createdAt: String!
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
  }
`;
