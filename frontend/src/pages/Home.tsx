import React from "react";
import { useQuery } from "@apollo/client";
import { GetPostsData, Querys } from "../graphql/Querys";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery<GetPostsData>(Querys.FETCH_POSTS_QUERY);
  const posts = data?.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row
        style={{ marginTop: "10px", display: "block", textAlign: "center" }}
      >
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column
              key={post.id.toString()}
              style={{ marginBottom: "20px" }}
            >
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
