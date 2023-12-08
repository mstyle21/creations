import { createContext } from "react";
import { TTokenStatus, User } from "../hooks/useAuth";

interface IAuthContext {
  user: User | null;
  loginRedirect: string | null;
  login: (token: string) => void;
  logout: (redirectPath?: string) => void;
  getTokenStatus: () => TTokenStatus;
}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  loginRedirect: null,
  login: () => {},
  logout: () => {},
  getTokenStatus: () => "valid",
});
