import {
  ForgotPasswordForm,
  type ForgotPasswordCredentials,
} from "@/features/auth";

export default function ForgotPassword() {
  const handleForgotPassword = (_values: ForgotPasswordCredentials) => {
    // insert login here
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <ForgotPasswordForm onSubmit={handleForgotPassword} />
      </div>
    </div>
  );
}
