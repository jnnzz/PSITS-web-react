import { SignupForm, type SignupCredentials } from "@/features/auth";

const courses = ["BSIT", "BSCS"];

export default function Signup() {
  const handleSignup = (_values: SignupCredentials) => {
    // insert signup here
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-gray-300">
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <SignupForm onSignup={handleSignup} courses={courses} />
      </div>
    </div>
  );
}
