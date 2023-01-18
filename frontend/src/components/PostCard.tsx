import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import Post from "../../../src/types/Post";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LikeButton } from "./LikeButton";
import { DeleteButton } from "./DeleteButton";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    username,
    createdAt,
    postBody,
    id,
    likes,
    likesCount,
    commentsCount,
  } = post;

  const {
    userState: { user },
  } = useContext(AuthContext);

  function onCommentPost() {
    console.log("Comment post");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{postBody}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likesCount, likes }} />
        <Button as="div" labelPosition="right" onClick={onCommentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === post.username && (
          <DeleteButton postId={post.id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
