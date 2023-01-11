import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import Post from "../../../src/types/Post";
import moment from "moment";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { username, createdAt, postBody, id, likesCount, commentsCount } = post;

  function onLikePost() {
    console.log("like post");
  }

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
        <Button as="div" labelPosition="right" onClick={onLikePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likesCount}
          </Label>
        </Button>

        <Button as="div" labelPosition="right" onClick={onCommentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
