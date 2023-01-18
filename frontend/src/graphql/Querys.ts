import { gql } from "@apollo/client";
import Post from "../../../src/types/Post";

export interface GetPostsData {
  getPosts: Post[];
}

export const Querys = {
  FETCH_POSTS: gql`
    query GetPosts {
      getPosts {
        id
        postBody
        createdAt
        username
        likesCount
        likes {
          username
        }
        commentsCount
        comments {
          id
          username
          createdAt
          commentBody
        }
      }
    }
  `,
  REGISTER_USER: gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        inputData: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdAt
        token
      }
    }
  `,
  LOGIN_USER: gql`
    mutation login($username: String!, $password: String!) {
      login(inputData: { username: $username, password: $password }) {
        id
        email
        username
        createdAt
        token
      }
    }
  `,
  CREATE_POST: gql`
    mutation createPost($postBody: String!) {
      createPost(postBody: $postBody) {
        id
        postBody
        createdAt
        username
        likesCount
        likes {
          username
        }
        commentsCount
        comments {
          id
          username
          createdAt
          commentBody
        }
      }
    }
  `,
  TOGGLE_LIKE_POST: gql`
    mutation ToggleLikePost($postId: String!) {
      toggleLikePost(postId: $postId) {
        id
        likes {
          id
          username
        }
        likesCount
      }
    }
  `,
};
