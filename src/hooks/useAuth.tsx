import { useState } from "react";

export const TOKEN_KEY = "creations_tkn";

export type User = {
  id: number;
  email: string;
  token: string;
  role: string;
};

type TokenPayload = {
  userId: number;
  email: string;
  role: string;
  date: Date;
  exp: number;
};

export type TTokenStatus = "valid" | "expired" | "expire-soon";

/**
 * Decode the token and split it to get the payload data
 * @param token
 * @returns TTokenPayload
 */
const getTokenPayload = (token: string): TokenPayload => {
  return JSON.parse(atob(token.split(".")[1]));
};

/**
 * Get user details from token
 * @param token
 * @returns IUser
 */
const getUserFromToken = (token: string): User => {
  const tokenPayload = getTokenPayload(token);
  return {
    id: tokenPayload.userId,
    email: tokenPayload.email,
    token: token,
    role: tokenPayload.role,
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      return getUserFromToken(token);
    }

    return null;
  });
  const [loginRedirect, setLoginRedirect] = useState<string | null>(null);

  const login = (token: string): void => {
    const user = getUserFromToken(token);

    setUser(user);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = (redirectPath: string | null = null): void => {
    setLoginRedirect(redirectPath);

    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const getTokenStatus = (): TTokenStatus => {
    if (!user || !user.token) {
      return "expired";
    }
    const tokenPayload = getTokenPayload(user.token);

    const now = Math.floor(Date.now() / 1000);

    if (now > tokenPayload.exp) {
      return "expired";
    }

    //if expire time is within 10 minutes (600 seconds), refresh token
    if (now < tokenPayload.exp && now + 6000 > tokenPayload.exp) {
      return "expire-soon";
    }

    return "valid";
  };

  return { user, loginRedirect, login, logout, getTokenStatus };
};
