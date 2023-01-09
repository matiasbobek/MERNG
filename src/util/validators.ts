import { RegisterInput } from "../graphql/resolvers/users";
import Post from "../types/Post";
import User from "../types/User";

export interface ValidationErrors<T> {
  errors: T;
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

interface GetPostErrors {
  postId?: string;
  general?: string;
}

interface CreatePostErrors {
  postBody?: string;
}

/*
 * User mutation arguments validations
 */

export function validateRegisterInput(
  registerInput: RegisterInput
): ValidationErrors<RegisterInputErrors> {
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

export function validateLoginInput(
  loginInput: User
): ValidationErrors<LoginInputErrors> {
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

/*
 * Post mutation arguments validations
 */

export function validatePostId(
  postId: string
): ValidationErrors<GetPostErrors> {
  const errors: GetPostErrors = {};

  if (postId.trim().length === 0) {
    errors.postId = "Post Id must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

export function validatePostCreationInput(
  postBody: string
): ValidationErrors<CreatePostErrors> {
  const errors: CreatePostErrors = {};
  if (postBody.trim().length === 0) {
    errors.postBody = "The post body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
