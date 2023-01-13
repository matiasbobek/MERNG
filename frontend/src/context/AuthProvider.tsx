import jwtDecode from "jwt-decode";
import { useReducer } from "react";
import User from "../../../src/types/User";
import { UserState } from "../types/User";
import { AuthContext } from "./AuthContext";
import { AuthActionKinds, authReducer } from "./AuthReducer";

let INITIAL_STATE: UserState = {
  user: null,
};

interface TokenUser extends User {
  exp: number;
}

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode<TokenUser>(localStorage.getItem("jwtToken")!);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    INITIAL_STATE.user = decodedToken;
  }
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const login = (user: User) => {
    localStorage.setItem("jwtToken", user.token);
    dispatch({ type: AuthActionKinds.LOGIN, payload: user });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: AuthActionKinds.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ userState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
