import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { GetPostsData, Querys } from "../graphql/Querys";

function PostForm() {
  const [values, setValues] = useState({ postBody: "" });
  const [error, setError] = useState("");

  const [createPost, { loading }] = useMutation(Querys.CREATE_POST, {
    update(proxy, result) {
      setValues({ postBody: "" });
      const data = proxy.readQuery<GetPostsData>({
        query: Querys.FETCH_POSTS,
      });
      if (data) {
        setError("");
        const newData = { getPosts: [...data.getPosts] } as GetPostsData;
        newData.getPosts.unshift(result.data.createPost);
        proxy.writeQuery({ query: Querys.FETCH_POSTS, data: newData });
      } else {
        const newData = {
          getPosts: [result.data.createPost],
        } as GetPostsData;
        proxy.writeQuery({ query: Querys.FETCH_POSTS, data: newData });
      }
    },
    onError(err) {
      setError(err?.graphQLErrors[0].message);
    },
    variables: values,
  });

  function onSubmit() {
    createPost();
  }

  function onChange(event: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  }

  return (
    <>
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi world!"
            name="postBody"
            onChange={onChange}
            value={values.postBody}
            error={error ? error : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default PostForm;
