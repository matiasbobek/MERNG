import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Querys } from "../graphql/Querys";
import { RegisterInputErrors } from "../../../src/util/validators";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register(props: any) {
  const [errors, setErrors] = useState<RegisterInputErrors>({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userState } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(
    Querys.REGISTER_USER_MUTATION,
    {
      update(_, { data: { register: userData } }) {
        login(userData);
        navigate("/");
      },
      onError(err) {
        if (err.graphQLErrors[0])
          setErrors(
            err.graphQLErrors[0].extensions.errors as RegisterInputErrors
          );
      },
      variables: values,
    }
  );

  function onSubmit(event: any) {
    event.preventDefault();
    registerUser();
  }

  function onChange(event: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
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
        <h1>Register</h1>
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
          error={errors.email}
          label="Email"
          placeholed="email..."
          name="email"
          value={values.email}
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
        <Form.Input
          required
          error={errors.confirmPassword}
          label="Confirm Password"
          placeholed="password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
