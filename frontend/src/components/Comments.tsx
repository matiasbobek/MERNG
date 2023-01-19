import { Types } from "mongoose";
import { Comment as CommentType } from "../../../src/types/Comment";
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Confirm,
} from "semantic-ui-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { Querys } from "../graphql/Querys";

interface CommentsProps {
  comments: CommentType[];
  postId: Types.ObjectId;
}

export const Comments: React.FC<CommentsProps> = ({ comments, postId }) => {
  const CONFIRM_DELETE_CONTENT = "Are you sure to delete this comment?";

  const {
    userState: { user },
  } = useContext(AuthContext);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<Types.ObjectId>();

  const [createComment] = useMutation(Querys.CREATE_COMMENT, {
    variables: { commentBody: newCommentBody, postId },
    update() {
      setNewCommentBody("");
    },
  });

  const [deleteComment] = useMutation(Querys.DELETE_COMMENT, {
    variables: {
      postId,
      commentId: deleteCommentId,
    },
  });

  function onDeleteComment() {
    setConfirmOpen(false);
    deleteComment();
  }

  function onCreateComment() {
    createComment();
  }
  return (
    <>
      <Comment.Group>
        {(user || comments.length > 0) && (
          <Header as="h3" dividing>
            Comments
          </Header>
        )}

        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <Comment key={comment.id?.toString()}>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                <Comment.Content>
                  <Comment.Author style={{ display: "inline" }}>
                    {comment.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(comment.createdAt).fromNow()}</div>
                  </Comment.Metadata>
                  {comment.username === user?.username && (
                    <Comment.Action
                      onClick={() => {
                        setDeleteCommentId(comment.id!);
                        setConfirmOpen(true);
                      }}
                      style={{
                        float: "right",
                        marginRight: "10%",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="trash" color="grey" />
                    </Comment.Action>
                  )}
                  <Comment.Text>{comment.commentBody}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}

        {user && (
          <Form reply>
            <Form.TextArea
              value={newCommentBody}
              onChange={(e) => setNewCommentBody(e.target.value)}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              onClick={onCreateComment}
            />
          </Form>
        )}
      </Comment.Group>

      <Confirm
        content={CONFIRM_DELETE_CONTENT}
        onConfirm={onDeleteComment}
        onCancel={() => setConfirmOpen(false)}
        open={confirmOpen}
      ></Confirm>
    </>
  );
};
