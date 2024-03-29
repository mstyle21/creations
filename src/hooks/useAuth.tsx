import { useState } from "react";
import { refreshToken } from "../features/auth/api/login";
import { TOKEN_EXPIRE_SOON, TTokenStatus, TOKEN_EXPIRED, TOKEN_VALID } from "../types";

export const TOKEN_KEY = import.meta.env.VITE_BACKEND_URL;
export const INVALID_TOKEN_MSG = "Token expired or invalid!";
const TOKEN_EXPIRE_RANGE = 10 * 60; //MINUTES * SECONDS

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

/**
 * Decode the token and split it to get the payload data
 * @param token
 * @returns TTokenPayload
 */
const _getTokenPayload = (token: string): TokenPayload => {
  return JSON.parse(atob(token.split(".")[1]));
};

/**
 * Get user details from token
 * @param token
 * @returns IUser
 */
const _getUserFromToken = (token: string): User => {
  const tokenPayload = _getTokenPayload(token);
  return {
    id: tokenPayload.userId,
    email: tokenPayload.email,
    token: token,
    role: tokenPayload.role,
  };
};

const _getTokenStatus = (token: string): TTokenStatus => {
  const tokenPayload = _getTokenPayload(token);

  const now = Math.floor(Date.now() / 1000);

  if (now > tokenPayload.exp) {
    return TOKEN_EXPIRED;
  }

  //if expire time is within 10 minutes, refresh token
  if (now < tokenPayload.exp && now + TOKEN_EXPIRE_RANGE > tokenPayload.exp) {
    return TOKEN_EXPIRE_SOON;
  }

  return TOKEN_VALID;
};

const _refreshUserToken = async () => {
  const { token, error } = await refreshToken();

  if (error) {
    return false;
  }

  return token;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const tokenStatus = _getTokenStatus(token);

      if (tokenStatus === TOKEN_EXPIRED) {
        return null;
      }

      return _getUserFromToken(token);
    }

    return null;
  });
  const [loginRedirect, setLoginRedirect] = useState<string | null>(null);

  const login = (token: string): void => {
    const user = _getUserFromToken(token);

    setUser(user);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = (redirectPath: string | null = null): void => {
    setLoginRedirect(redirectPath);

    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const runCheckToken = async () => {
    if (user) {
      const tokenStatus = _getTokenStatus(user.token);

      if (tokenStatus === TOKEN_EXPIRED) {
        logout();
      }

      if (tokenStatus === TOKEN_EXPIRE_SOON) {
        const newToken = await _refreshUserToken();
        if (newToken) {
          localStorage.setItem(TOKEN_KEY, newToken);
          setUser(_getUserFromToken(newToken));
        }
      }
    }
  };

  return { user, loginRedirect, login, logout, runCheckToken };
};
