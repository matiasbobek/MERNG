import { RegisterInput } from "../graphql/resolvers/users";
import Post from "../types/Post";
import User from "../types/User";

export interface ValidationErrors<T> {
  errors: T;
  valid: boolean;
}

export interface LoginInputErrors {
  username?: string;
  password?: string;
  general?: string;
}

export interface RegisterInputErrors extends LoginInputErrors {
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

interface CreateCommentErrors extends GetPostErrors {
  commentBody?: string;
}

interface DeleteCommentErrors extends GetPostErrors {
  commentId?: string;
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

/*
 * Comment mutation arguments validations
 */

export function validateCommentCreationInput(
  postId: string,
  commentBody: string
): ValidationErrors<CreateCommentErrors> {
  const errors: CreateCommentErrors = {};
  if (postId.trim().length === 0) {
    errors.postId = "Post ID must not be empty";
  }

  if (commentBody.trim().length === 0) {
    errors.commentBody = "Comment body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

export function validateCommentDeletionInput(
  postId: string,
  commentId: string
): ValidationErrors<DeleteCommentErrors> {
  const errors: DeleteCommentErrors = {};
  if (postId.trim().length === 0) {
    errors.postId = "Post ID must not be empty";
  }

  if (commentId.trim().length === 0) {
    errors.commentId = "Comment ID must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
