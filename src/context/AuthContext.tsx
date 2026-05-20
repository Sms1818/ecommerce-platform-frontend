import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserResponse } from "../types/auth";
import {
  AUTH_STORAGE_KEY,
  extractUserFromAuth,
  parseStoredUser,
} from "../utils/auth";

type LoginPayload = {
  response?: UserResponse;
  user?: UserResponse;
  token?: string | null;
};

type AuthContextValue = {
  user: UserResponse | null;
  loading: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = parseStoredUser(stored);
      if (parsed) setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = useCallback((payload: LoginPayload) => {
    const nextUser = extractUserFromAuth(payload);
    if (!nextUser) return;

    setUser(nextUser);
    const token = payload.token ?? null;
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user: nextUser, token }),
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
