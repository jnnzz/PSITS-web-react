import { OTPForm } from "@/features/auth";

export default function OTPCode() {
  const handleResend = () => {
    // insert resend code here
  };

  const handleVerify = (_value: string) => {
    // insert verify code here
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <OTPForm onResend={handleResend} onVerify={(v) => handleVerify(v)} />
      </div>
    </div>
  );
}
