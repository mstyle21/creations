import { createContext, useContext } from "react";
import { User } from "../hooks/useAuth";

interface IAuthContext {
  user: User | null;
  loginRedirect: string | null;
  login: (token: string) => void;
  logout: (redirectPath?: string) => void;
}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  loginRedirect: null,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuthContext must be used with a AuthContext");
  }

  return authContext;
};
