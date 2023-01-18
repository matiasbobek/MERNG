import { useMutation } from "@apollo/client";
import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { Like } from "../../../src/types/Like";
import User from "../../../src/types/User";
import { Querys } from "../graphql/Querys";

interface LikeButtonProps {
  user: User | null;
  post: {
    id: Types.ObjectId;
    likes: Like[];
    likesCount: number;
  };
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  post: { id, likes, likesCount },
  user,
}) => {
  const [liked, setLiked] = useState(false);

  const [toggleLikePost] = useMutation(Querys.TOGGLE_LIKE_POST, {
    variables: {
      postId: id,
    },
  });

  function handleOnLike() {
    user && toggleLikePost();
  }

  const heartButton = user ? (
    <Button color="teal" basic={!liked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button as={Link} to="/login" color="teal" basic={!liked}>
      <Icon name="heart" />
    </Button>
  );

  useEffect(() => {
    if (
      user &&
      likes &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [likes, user]);

  return (
    <Button as="div" labelPosition="right" onClick={handleOnLike}>
      {heartButton}
      <Label basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
};
