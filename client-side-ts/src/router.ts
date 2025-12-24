import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/layout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Organizations } from './pages/Organizations';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { OtpCode } from './pages/auth/OtpCode';
import { SetNewPassword } from './pages/auth/SetNewPassword';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfCondition } from './pages/TermsOfCondition';

export default createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'events', Component: Events },
      { path: 'organizations', Component: Organizations },
      { path: 'privacy', Component: PrivacyPolicy },
      { path: 'terms', Component: TermsOfCondition },
      {
        path: 'auth',
        children: [
          { path: 'login', Component: Login },
          { path: 'signup', Component: Signup },
          { path: 'forgot-password', Component: ForgotPassword },
          { path: 'otp', Component: OtpCode },
          { path: 'reset-password', Component: SetNewPassword },
        ],
      },
    ],
  },
]);
