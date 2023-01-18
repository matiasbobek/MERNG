import { useQuery } from "@apollo/client";
import { GetPostsData, Querys } from "../graphql/Querys";
import { Grid, Loader, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";

function Home() {
  const {
    userState: { user },
  } = useContext(AuthContext);

  const { loading, data } = useQuery<GetPostsData>(Querys.FETCH_POSTS);
  const posts = data?.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row
        style={{ marginTop: "10px", display: "block", textAlign: "center" }}
      >
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column
                  key={post.id.toString()}
                  style={{ marginBottom: "20px" }}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
