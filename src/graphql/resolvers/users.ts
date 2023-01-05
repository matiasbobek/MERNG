import UserModel from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../types/User";
import config from "../../../config";
import { UserInputError } from "apollo-server";
import { validateRegisterInput } from "../../util/validators";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegisterInputArgs {
  registerInput: RegisterInput;
}

export interface DocumentResult<T> {
  _doc: T;
}

const Mutation = {
  async register(_: any, args: RegisterInputArgs): Promise<User> {
    let { password, username, email } = args.registerInput;

    const validation = validateRegisterInput(args.registerInput);
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

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
        username: result.username,
      },
      config.SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    return {
      ...result._doc,
      id: result._id,
      token,
    };
  },
};

export default Mutation;
