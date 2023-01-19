import { useMutation } from "@apollo/client";
import { Types } from "mongoose";
import { useState } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";
import { Querys } from "../graphql/Querys";

export const DeleteButton: React.FC<{
  postId: Types.ObjectId;
  deletePostCallback?: () => void;
}> = ({ postId, deletePostCallback }) => {
  const CONFIRM_CONTENT = "Are you sure to delete this post?";
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(Querys.DELETE_POST, {
    variables: {
      postId,
    },
    update(cache) {
      const normalizedId = cache.identify({ id: postId, __typename: "Post" });
      cache.evict({ id: normalizedId });
      cache.gc();
      if (deletePostCallback) deletePostCallback();
    },
  });

  function handleOnDelete() {
    setConfirmOpen(false);
    deletePost();
  }

  return (
    <>
      <Popup
        inverted
        content="Delete post"
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleOnDelete}
        content={CONFIRM_CONTENT}
      />
    </>
  );
};
