import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);
const SESSION_KEY = "swms_session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null); // { token, user }
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (saved?.token) setSession(saved);
    } catch {
      // ignore corrupted session
    }
    setReady(true);
  }, []);

  const save = (data) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    setSession(data);
  };

  const signup = async ({ name, email, password }) => {
    try {
      const data = await api("/auth/signup", {
        method: "POST",
        body: { name, email, password },
      });
      save(data);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      save(data);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        token: session?.token ?? null,
        ready,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}