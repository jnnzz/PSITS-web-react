import { LoginForm, type LoginCredentials } from "@/features/auth";
import { loginV2 } from "@/features/auth/api";

export default function Login() {
  const handleLogin = (_values: LoginCredentials) => {
    loginV2({
      idNumber: _values.id,
      password: _values.password,
      rememberMe: _values.rememberMe,
    });
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
