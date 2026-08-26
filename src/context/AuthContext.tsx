import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";

const TEST_USER: User = {
  id: "test-user-1",
  name: "Test User",
  authProvider: "placeholder",
};

const STORAGE_KEY = "recipe-app:user";

interface AuthContextValue {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? TEST_USER : null;
  });

  const login = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setUser(TEST_USER);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
