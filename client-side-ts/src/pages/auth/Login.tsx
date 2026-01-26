import { LoginForm, type LoginCredentials } from "@/features/auth";

export default function Login() {
  const handleLogin = (_values: LoginCredentials) => {
    // insert login here
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
