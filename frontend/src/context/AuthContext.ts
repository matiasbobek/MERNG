import { createContext } from "react";
import { UserState } from "../types/User";

import User from "../../../src/types/User";

export type UserContextProps = {
  userState: UserState;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<UserContextProps>(
  {} as UserContextProps
);
