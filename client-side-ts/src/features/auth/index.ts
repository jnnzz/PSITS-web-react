// Components
export { default as LoginForm } from "./components/LoginForm";
export { default as SignupForm } from "./components/SignupForm";
export { default as ForgotPasswordForm } from "./components/ForgotPasswordForm";
export { default as OTPForm } from "./components/OTPForm";
export { default as SetNewPasswordForm } from "./components/SetNewPasswordForm";

// Context & Provider
export { AuthProvider } from "./context/AuthContext.tsx";
export type { AuthContextValue } from "./context/AuthContext.tsx";

// Hooks
export { useAuth } from "./hooks/useAuth";

// Auth API (v2)
export { loginUser, logoutUser, refreshTokens } from "./api/auth.api";

// Auth Types
export type {
  User,
  AuthResponse,
  LoginPayload,
  AuthState,
} from "./types/auth.types";

// Form Component Types
export type { LoginCredentials, LoginFormProps } from "./components/LoginForm";
export type {
  SignupCredentials,
  SignupFormProps,
} from "./components/SignupForm";
export type {
  ForgotPasswordCredentials,
  ForgotPasswordFormProps,
} from "./components/ForgotPasswordForm";
export type { OTPFormProps } from "./components/OTPForm";
export type {
  SetNewPasswordCredentials,
  SetNewPasswordFormProps,
} from "./components/SetNewPasswordForm";
