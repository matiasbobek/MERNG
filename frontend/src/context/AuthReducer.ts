import User from "../../../src/types/User";
import { UserState } from "../types/User";

export enum AuthActionKinds {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export const authReducer = (
  state: UserState,
  action: AuthAction
): UserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
