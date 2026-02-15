import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth";

interface ProtectedRouteProps {
  /** Which roles are allowed through. Omit to allow any authenticated user. */
  allowedRoles?: Array<"Admin" | "Student">;
  /** Where to redirect unauthenticated users. Defaults to /auth/login. */
  redirectTo?: string;
}

/**
 * Route guard component.
 *
 * - While auth is loading (silent refresh), shows a centered spinner.
 * - Redirects unauthenticated users to the login page.
 * - If `allowedRoles` is set, redirects users whose role isn't in the list.
 * - Otherwise renders `<Outlet />` (child routes).
 */
export default function ProtectedRoute({
  allowedRoles,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User is authenticated but lacks role — send to a safe landing page
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
