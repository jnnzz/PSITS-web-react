import ForgotPasswordForm, { type ForgotPasswordCredentials } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  const handleForgotPassword = (_values: ForgotPasswordCredentials) => {
    // insert login here
  };

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-row">
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <ForgotPasswordForm onSubmit={handleForgotPassword} />
      </div>
    </div>
  );
}
