import { createBrowserRouter, Outlet } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Organizations } from './pages/Organizations';
import { Resources } from './pages/Resources';
import { Shop } from './pages/Shop';
import { Cart} from './pages/Cart';
import { ProductDetails } from './components/sections/shop/ProductDetails';
import OTPCode from './pages/auth/OtpCode';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfCondition } from './pages/TermsOfCondition';
import { Dashboard } from './pages/admin/Dashboard';
import { ErrorPage } from './pages/ErrorPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import SetNewPassword from './pages/auth/SetNewPassword';
import StudentLayout from './layouts/StudentLayout';
import EventAttendance from './pages/students/EventAttendance';
import MyOrders from './pages/students/MyOrders';
import AccountSettings from './pages/students/AccountSettings';

export default createBrowserRouter([
  {
    path: '/',
    Component: Outlet,
    ErrorBoundary: ErrorPage,
    children: [
      // Public / Student / Landing Routes
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: 'events', Component: Events },
          { path: 'organizations', Component: Organizations },
          { path: 'resources', Component: Resources },
          { path: 'shop', Component: Shop },
          { path: 'shop/:id', Component: ProductDetails },
          { path: 'cart', Component: Cart },
          {
            path: 'student',
            Component: StudentLayout,
            children: [
              { index: true, Component: EventAttendance },
              { path: 'event-attendance', Component: EventAttendance },
              { path: 'my-orders', Component: MyOrders },
              { path: 'account-settings', Component: AccountSettings },
            ],
          },
        ],
      },
      
      // Static Pages (No Header/Footer)
      { path: 'privacy', Component: PrivacyPolicy },
      { path: 'terms', Component: TermsOfCondition },
      // Authentication Routes
      {
        path: 'auth',
        children: [
          { path: 'login', Component: Login },
          { path: 'signup', Component: Signup },
          { path: 'forgot-password', Component: ForgotPassword },
          { path: 'otp', Component: OTPCode },
          { path: 'reset-password', Component: SetNewPassword },
        ],
      },
      // Admin Routes
      {
        path: 'admin',
        Component: AdminLayout,
        children: [{ index: true, Component: Dashboard }],
      },
      
      // Admin Routes
      {
        path: 'admin',
        Component: AdminLayout,
        children: [{ index: true, Component: Dashboard }],
      },
    ],
  },
]);
