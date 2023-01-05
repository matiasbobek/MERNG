import { RegisterInput } from "../graphql/resolvers/users";

export interface RegisterErrorsValidation {
  errors: RegisterInputErrors;
  valid: boolean;
}

interface RegisterInputErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function validateRegisterInput(
  registerInput: RegisterInput
): RegisterErrorsValidation {
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
