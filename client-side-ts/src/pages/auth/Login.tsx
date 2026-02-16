import { LoginForm, useAuth, type LoginCredentials } from "@/features/auth";
import sidePhoto from "@/assets/side_photo_forms.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { showToast } from "@/utils/alertHelper";

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (values: LoginCredentials) => {
    setIsSubmitting(true);
    try {
      const loggedInUser = await login({
        id_number: values.id,
        password: values.password,
      });

      showToast("success", "Signed in successfully");

      if (loggedInUser.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Login failed. Please try again.";
      showToast("error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      {/* Left Side: Login Form */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <LoginForm onLogin={handleLogin} isSubmitting={isSubmitting} />
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
