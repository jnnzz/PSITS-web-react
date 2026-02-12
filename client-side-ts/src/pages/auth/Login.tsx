import { LoginForm, type LoginCredentials } from "@/features/auth";
import sidePhoto from "@/assets/side_photo_forms.png";

export default function Login() {
  const handleLogin = async (_values: LoginCredentials) => {};

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      {/* Left Side: Login Form */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <LoginForm onLogin={handleLogin} />
      </div>

      {/* Right Side: Image */}
      <div className="hidden h-full w-1/2 md:flex">
        <img
          src={sidePhoto}
          alt="Login visual"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
