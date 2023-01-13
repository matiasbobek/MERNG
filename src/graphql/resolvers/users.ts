import UserModel from "../../models/User";
import bcrypt from "bcryptjs";
import User from "../../types/User";
import { generateToken } from "../../util/tokens";
import { UserInputError } from "apollo-server";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../../util/validators";

export interface UserRequestContext extends Request {
  req: {
    headers: {
      authorization: string;
    };
  };
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  confirmPassword: string;
  email: string;
}

// For the graphql input structure
interface InputArgs<T> {
  inputData: T;
}

// For the mongoose response when creating a model instance
export interface DocumentResult<T> {
  _doc: T;
}

const Mutation = {
  async register(_: any, args: InputArgs<RegisterInput>): Promise<User> {
    let { password, username, email } = args.inputData;

    const validation = validateRegisterInput(args.inputData);
    if (!validation.valid)
      throw new UserInputError("Required fields missing or wrong", {
        errors: validation.errors,
      });

    const user = await UserModel.findOne({ username });
    if (user)
      throw new UserInputError("Username is taken", {
        errors: {
          username: "This username is taken",
        },
      });

    password = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      username,
      password,
      email,
      createdAt: new Date().toISOString(),
    });

    const result = await newUser.save();

    const token = generateToken(result);

    return {
      ...result._doc,
      id: result._id,
      token,
    };
  },

  async login(_: any, args: InputArgs<User>): Promise<User> {
    const { username, password } = args.inputData;
    const { errors, valid } = validateLoginInput(args.inputData);

    if (!valid) {
      throw new UserInputError("Invalid login data", {
        errors,
      });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      errors.general = "User not found";
      throw new UserInputError("User not found", { errors });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      errors.general = "Invalid username or password entered";
      throw new UserInputError("Wrong credentials", { errors });
    }

    const token = generateToken(user);

    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },
};

export default Mutation;
