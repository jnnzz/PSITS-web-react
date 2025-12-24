import SignupForm, {
  type SignupCredentials,
} from '@/components/auth/SignupForm';

const courses = ['BSIT', 'BSCS'];

export default function Signup() {
  const handleSignup = (_values: SignupCredentials) => {
    // insert signup here
  };

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-row">
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <SignupForm onSignup={handleSignup} courses={courses} />
      </div>
    </div>
  );
}
