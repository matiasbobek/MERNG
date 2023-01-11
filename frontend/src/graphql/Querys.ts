import { gql } from "@apollo/client";
import Post from "../../../src/types/Post";

export interface GetPostsData {
  getPosts: Post[];
}

export const Querys = {
  FETCH_POSTS_QUERY: gql`
    {
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
};
