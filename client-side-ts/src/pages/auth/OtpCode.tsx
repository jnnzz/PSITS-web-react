import OTPForm from "@/components/auth/OTPForm";

export default function OTPCode() {
  const handleResend = () => {
    // insert resend code here
  }

  const handleVerify = (_value: string) => {
    // insert verify code here
  }

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-row">
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <OTPForm onResend={handleResend} onVerify={(v) => handleVerify(v)} />
      </div>
    </div>
  );
}
