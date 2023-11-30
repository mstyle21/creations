import { createContext } from "react";
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
