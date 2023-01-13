import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Message } from "semantic-ui-react";
import { Querys } from "../graphql/Querys";
import { LoginInputErrors } from "../../../src/util/validators";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login(props: any) {
  const { userState, login } = useContext(AuthContext);
  const [errors, setErrors] = useState<LoginInputErrors>({});
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(Querys.LOGIN_USER_MUTATION, {
    update(_, { data: { login: userData } }) {
      login(userData);
      navigate("/");
    },
    onError(err) {
      if (err.graphQLErrors[0])
        setErrors(err.graphQLErrors[0].extensions.errors as LoginInputErrors);
    },
    variables: loginValues,
  });

  function onSubmit(event: any) {
    event.preventDefault();
    loginUser();
  }

  function onChange(event: any) {
    setLoginValues({ ...loginValues, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: undefined });
  }

  useEffect(() => {
    if (userState.user) {
      navigate("/");
    }
  }, [userState.user, navigate]);

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
          value={loginValues.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          required
          error={errors.password}
          label="Password"
          placeholed="password..."
          name="password"
          type="password"
          value={loginValues.password}
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
