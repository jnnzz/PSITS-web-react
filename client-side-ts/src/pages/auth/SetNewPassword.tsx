import type { SetNewPasswordCredentials } from '@/components/auth/SetNewPasswordForm';
import SetNewPasswordForm from '@/components/auth/SetNewPasswordForm';

export default function SetNewPassword() {
  const handleSetNewPassword = (_values: SetNewPasswordCredentials) => {
    // insert login here
  };

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-row">
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <SetNewPasswordForm onResetPassword={handleSetNewPassword} />
      </div>
    </div>
  );
}
