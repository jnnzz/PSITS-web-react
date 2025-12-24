import { createBrowserRouter, Outlet } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Organizations } from "./pages/Organizations";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { OtpCode } from "./pages/auth/OtpCode";
import { SetNewPassword } from "./pages/auth/SetNewPassword";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfCondition } from "./pages/TermsOfCondition";
import { Dashboard } from "./pages/admin/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";

export default createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    ErrorBoundary: ErrorPage,
    children: [
      // Public / Student / Landing Routes
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: "events", Component: Events },
          { path: "organizations", Component: Organizations },
        ],
      },
      // Static Pages (No Header/Footer)
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfCondition },
      // Authentication Routes
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: SignUp },
          { path: "forgot-password", Component: ForgotPassword },
          { path: "otp", Component: OtpCode },
          { path: "reset-password", Component: SetNewPassword },
        ],
      },
      // Admin Routes
      {
        path: "admin",
        Component: AdminLayout,
        children: [{ index: true, Component: Dashboard }],
      },
    ],
  },
]);
