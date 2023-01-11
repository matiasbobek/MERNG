import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { Querys } from "../graphql/Querys";
import { LoginInputErrors } from "../../../src/util/validators";
import { useNavigate } from "react-router-dom";

function Login(props: any) {
  const [errors, setErrors] = useState<LoginInputErrors>({});

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(Querys.LOGIN_USER_MUTATION, {
    update(_, result) {
      navigate("/");
    },
    onError(err) {
      if (err.graphQLErrors[0])
        setErrors(err.graphQLErrors[0].extensions.errors as LoginInputErrors);
    },
    variables: values,
  });

  function onSubmit(event: any) {
    event.preventDefault();
    loginUser();
  }

  function onChange(event: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: undefined });
  }

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          required
          error={errors.username}
          label="Username"
          placeholed="username..."
          name="username"
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          required
          error={errors.password}
          label="Password"
          placeholed="password..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {errors.general && <Message error content={errors.general} />}
    </div>
  );
}

export default Login;
