import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  Icon,
  Label,
  Message,
  Popup,
} from "semantic-ui-react";
import moment from "moment";
import { GetPostData, Querys } from "../graphql/Querys";
import { Loader, Image, Segment } from "semantic-ui-react";
import { LikeButton } from "../components/LikeButton";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { DeleteButton } from "../components/DeleteButton";
import { Comments } from "../components/Comments";

const loadingComponent = (
  <Segment>
    <Loader active size="large" />
    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  </Segment>
);

const SinglePost: React.FC<any> = (props) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const commentInputRef = useRef<any>();

  const { data, loading, error } = useQuery<GetPostData>(Querys.FETCH_POST, {
    variables: { postId },
  });

  const {
    userState: { user },
  } = useContext(AuthContext);

  function onClickCommentButton() {
    if (!user) navigate("/login");
    if (commentInputRef.current) commentInputRef.current.focus();
  }

  const singlePostCard = (
    <>
      {data?.getPost && (
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{data.getPost.username}</Card.Header>
                <Card.Meta>
                  {moment(data.getPost.createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>{data.getPost.postBody}</Card.Description>
              </Card.Content>

              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={data.getPost} />
                <Popup
                  inverted
                  content="Comment post"
                  trigger={
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={onClickCommentButton}
                    >
                      <Button basic color="blue">
                        <Icon name="comments"></Icon>
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {data.getPost.commentsCount}
                      </Label>
                    </Button>
                  }
                />
                {user && user.username === data.getPost.username && (
                  <DeleteButton
                    postId={data.getPost.id}
                    deletePostCallback={() => navigate("/")}
                  />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      )}
    </>
  );

  return (
    <>
      {loading ? (
        loadingComponent
      ) : error ? (
        <Message negative size="large">
          <p>There was an error finding this post </p>
        </Message>
      ) : (
        <Grid centered style={{ marginTop: "15px" }}>
          {singlePostCard}
          <Grid.Row>
            <Grid.Column width={9}>
              <Comments
                comments={data?.getPost.comments!}
                postId={data?.getPost.id!}
                commentInputRef={commentInputRef}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default SinglePost;
