import { LoginInput, RegisterInput } from "../graphql/resolvers/users";

export interface ErrorsValidation {
  errors: LoginInputErrors | RegisterInputErrors;
  valid: boolean;
}

interface LoginInputErrors {
  username?: string;
  password?: string;
  general?: string;
}

interface RegisterInputErrors extends LoginInputErrors {
  email?: string;
  confirmPassword?: string;
}

export function validateRegisterInput(
  registerInput: RegisterInput
): ErrorsValidation {
  const { username, email, password, confirmPassword } = registerInput;
  const errors: RegisterInputErrors = {};

  if (username.trim().length === 0)
    errors.username = "Username must not be empty";

  if (email.trim().length === 0) {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx))
      errors.email = "Email must be a valid email address";
  }

  if (password.length === 0) {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

export function validateLoginInput(loginInput: LoginInput): ErrorsValidation {
  const { username, password } = loginInput;
  const errors: LoginInputErrors = {};

  if (username.trim().length === 0) {
    errors.username = "Username must not be empty";
  }

  if (password.length === 0) {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
