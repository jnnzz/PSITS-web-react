import { createBrowserRouter, Outlet } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Home } from "./pages/home";
import { Events } from "./pages/events";
import { Organizations } from "./pages/organizations";
import { Resources } from "./pages/home/sections/Resources";
import { Shop } from "./pages/orders/components/Shop";
import { ProductDetailsPage } from "./pages/orders/components/ProductDetails";
import { Cart } from "./pages/orders/components/Cart";
import OTPCode from "./pages/auth/OtpCode";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfCondition } from "./pages/TermsOfCondition";
import Dashboard  from "./pages/admin/Dashboard";
import EventManagement from "./pages/admin/EventManagement";
import { ErrorPage } from "./pages/ErrorPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";
import AccountSettings from "./pages/student/AccountSettings";
import EventAttendance from "./pages/student/EventAttendance";
import MyOrders from "./pages/student/MyOrders";
import StudentLayout from "./layouts/StudentLayout";
import { AdminRouteGuard } from "./components/common/RouteGuards";

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
          { path: "resources", Component: Resources },
          { path: "shop", Component: Shop },
          { path: "shop/:id", Component: ProductDetailsPage },
          { path: "cart", Component: Cart },
          {
            path: "student",
            Component: StudentLayout,
            children: [
              { index: true, Component: AccountSettings },
              { path: "event-attendance", Component: EventAttendance },
              { path: "my-orders", Component: MyOrders },
              { path: "account-settings", Component: AccountSettings },
            ],
          },
        ],
      },
      // Static Pages (No Header/Footer)
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfCondition },
      // Authentication Routes
      {
        path: "auth",
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: Signup },
          { path: "forgot-password", Component: ForgotPassword },
          { path: "otp", Component: OTPCode },
          { path: "reset-password", Component: SetNewPassword },
        ],
      },
      // Admin Routes
      {
        path: "admin",
        Component: AdminRouteGuard,
        children: [
          {
            Component: AdminLayout,
            children: [
              { index: true, Component: Dashboard },
              { path: "events", Component: EventManagement },
            ],
          },
        ],
      },
    ],
  },
]);
