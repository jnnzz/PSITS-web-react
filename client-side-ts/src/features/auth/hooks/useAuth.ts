import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { AuthContextValue } from "../context/authContext";

/**
 * Convenience hook to consume AuthContext.
 *
 * Must be used within an `<AuthProvider>`.
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }

  return context;
}
